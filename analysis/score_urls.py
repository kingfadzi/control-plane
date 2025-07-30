#!/usr/bin/env python3

import argparse
import os
import sys
import requests
from bs4 import BeautifulSoup
import pdfplumber
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from tempfile import NamedTemporaryFile

def fetch_and_clean(url: str) -> str:
    resp = requests.get(url, timeout=20)
    resp.raise_for_status()
    ct = resp.headers.get("Content-Type", "").lower()

    # PDF
    if "application/pdf" in ct or url.lower().endswith(".pdf"):
        with NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(resp.content)
            tmp.flush()
            text = ""
            with pdfplumber.open(tmp.name) as pdf:
                for page in pdf.pages:
                    txt = page.extract_text()
                    if txt:
                        text += txt + "\n"
        os.remove(tmp.name)
        return text

    # HTML
    soup = BeautifulSoup(resp.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
        tag.decompose()
    return soup.get_text(separator="\n")

def split_sections(text: str) -> dict[str, str]:
    """
    Try Markdown headings, but always include FULL_DOCUMENT as fallback.
    """
    lines = text.splitlines()
    sections = {}
    current = None
    buffer = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("#"):
            if current:
                sections[current] = "\n".join(buffer).strip()
            current = stripped.lstrip("# ").strip()
            buffer = []
        else:
            buffer.append(line)
    if current:
        sections[current] = "\n".join(buffer).strip()

    # Always keep the full text around
    sections["FULL_DOCUMENT"] = text
    return sections

def score_sections(sections: dict[str, str],
                   rubric_emb: dict[str, np.ndarray],
                   model: SentenceTransformer) -> dict[str, float]:
    """
    For each rubric item, if the specific section exists use it;
    otherwise fall back to scoring the entire document.
    """
    full = sections["FULL_DOCUMENT"]
    scores = {}
    for section_name, emb in rubric_emb.items():
        txt = sections.get(section_name) or full
        sec_emb = model.encode(txt)
        sim = cosine_similarity([sec_emb], [emb])[0][0]
        scores[section_name] = float(sim)
    return scores

def aggregate_score(scores: dict[str, float], rubric: dict) -> float:
    total = 0.0
    for name, cfg in rubric.items():
        total += scores.get(name, 0.0) * cfg["weight"]
    return total

def main():
    parser = argparse.ArgumentParser(
        description="Score URLs (HTML or PDF) for architecture-doc completeness."
    )
    parser.add_argument("input_csv", help="CSV with a column 'url'")
    parser.add_argument("output_csv", help="Where to write results")
    parser.add_argument(
        "--model-dir", default="all-MiniLM-L12-v2",
        help="Path to local all-MiniLM-L12-v2 folder"
    )
    args = parser.parse_args()

    if not os.path.isdir(args.model_dir):
        raise FileNotFoundError(f"Model dir not found: {args.model_dir}")
    model = SentenceTransformer(args.model_dir)

    rubric = {
        "System Overview": {
            "prompt": "A high-level summary of the system scope, goals, and context in one paragraph",
            "weight": 0.2
        },
        "Component Descriptions": {
            "prompt": "List of major components with responsibilities and interactions",
            "weight": 0.3
        },
        "Data Flows": {
            "prompt": "Description or diagram of key data inputs, outputs, and flows between components",
            "weight": 0.25
        },
        "Non-Functional Requirements": {
            "prompt": "Coverage of performance, scalability, security, and other non-functional requirements",
            "weight": 0.25
        },
    }

    # Pre-encode
    rubric_emb = {name: model.encode(cfg["prompt"]) for name, cfg in rubric.items()}

    df = pd.read_csv(args.input_csv)
    if "url" not in df.columns:
        raise KeyError("Input CSV must have a column named 'url'")

    results = []
    for url in df["url"]:
        try:
            txt        = fetch_and_clean(url)
            secs       = split_sections(txt)
            sec_scores = score_sections(secs, rubric_emb, model)
            final_pct  = aggregate_score(sec_scores, rubric) * 100.0

            entry = {"url": url, "completeness_%": final_pct}
            entry.update({f"{k}_sim": v for k, v in sec_scores.items()})
            results.append(entry)
            print(f"[OK] {url} → {final_pct:.1f}%")
        except Exception as e:
            print(f"[ERROR] {url} → {e}", file=sys.stderr)
            results.append({"url": url, "completeness_%": None})

    out_df = pd.DataFrame(results)
    out_df.to_csv(args.output_csv, index=False)
    print(f"Results written to {args.output_csv}")

if __name__ == "__main__":
    main()