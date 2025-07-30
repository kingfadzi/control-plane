#!/usr/bin/env python3

import argparse
import os
import requests
from bs4 import BeautifulSoup
import pdfplumber
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from tempfile import NamedTemporaryFile

def fetch_and_clean(url: str) -> str:
    """
    Fetch a URL that may be HTML or PDF.
    If PDF, extract text via pdfplumber.
    Otherwise, remove scripts/styles/nav/footer/header from HTML.
    """
    resp = requests.get(url, timeout=20)
    resp.raise_for_status()
    content_type = resp.headers.get("Content-Type", "").lower()

    # PDF handling
    if "application/pdf" in content_type or url.lower().endswith(".pdf"):
        with NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(resp.content)
            tmp.flush()
            text = ""
            with pdfplumber.open(tmp.name) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        os.remove(tmp.name)
        return text

    # HTML fallback
    soup = BeautifulSoup(resp.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
        tag.decompose()
    return soup.get_text(separator="\n")

def split_sections(text: str) -> dict[str, str]:
    """
    Split text into sections on Markdown-style headings ('# Heading').
    Returns a dict mapping heading -> body.
    Falls back to one section named 'FULL_DOCUMENT' if no headings found.
    """
    lines = text.splitlines()
    sections = {}
    current = None
    buffer = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("#"):
            # save previous
            if current:
                sections[current] = "\n".join(buffer).strip()
            # new section
            current = stripped.lstrip("# ").strip()
            buffer = []
        else:
            buffer.append(line)
    # last section
    if current:
        sections[current] = "\n".join(buffer).strip()
    else:
        # no headings found
        sections["FULL_DOCUMENT"] = text
    return sections

def score_sections(sections: dict[str, str],
                   rubric_emb: dict[str, np.ndarray],
                   model: SentenceTransformer) -> dict[str, float]:
    """
    Compute cosine similarity between each section text and its rubric prompt embedding.
    Returns {section_name: similarity_float}.
    """
    scores = {}
    for section_name, emb in rubric_emb.items():
        text = sections.get(section_name, "")
        if text:
            sec_emb = model.encode(text)
            sim = cosine_similarity([sec_emb], [emb])[0][0]
            scores[section_name] = float(sim)
        else:
            scores[section_name] = 0.0
    return scores

def aggregate_score(scores: dict[str, float], rubric: dict) -> float:
    """
    Weighted sum of section scores → final completeness in [0.0, 1.0].
    """
    total = 0.0
    for name, cfg in rubric.items():
        total += scores.get(name, 0.0) * cfg["weight"]
    return total

def main():
    parser = argparse.ArgumentParser(
        description="Score a list of URLs (HTML or PDF) for architecture-doc completeness."
    )
    parser.add_argument("input_csv", help="CSV file with a column 'url'")
    parser.add_argument("output_csv", help="Where to write results")
    parser.add_argument(
        "--model-dir",
        default="all-MiniLM-L12-v2",
        help="Path to your local all-MiniLM-L12-v2 folder"
    )
    args = parser.parse_args()

    # 1. Load model
    if not os.path.isdir(args.model_dir):
        raise FileNotFoundError(f"Model directory not found: {args.model_dir}")
    model = SentenceTransformer(args.model_dir)

    # 2. Define your rubric
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

    # 3. Pre-encode rubric prompts
    rubric_emb = {
        name: model.encode(cfg["prompt"])
        for name, cfg in rubric.items()
    }

    # 4. Read input CSV of URLs
    df = pd.read_csv(args.input_csv)
    if "url" not in df.columns:
        raise KeyError("Input CSV must contain a column named 'url'.")

    results = []
    for url in df["url"]:
        try:
            raw_text    = fetch_and_clean(url)
            sections    = split_sections(raw_text)
            sec_scores  = score_sections(sections, rubric_emb, model)
            final_score = aggregate_score(sec_scores, rubric) * 100.0

            entry = {"url": url, "completeness_%": final_score}
            # optionally include per-section sims:
            for name, sim in sec_scores.items():
                entry[f"{name}_sim"] = sim
            results.append(entry)
            print(f"[OK] {url} → {final_score:.1f}%")
        except Exception as e:
            print(f"[ERROR] {url} → {e}", file=sys.stderr)
            results.append({"url": url, "completeness_%": None})

    # 5. Write out
    out_df = pd.DataFrame(results)
    out_df.to_csv(args.output_csv, index=False)
    print(f"Results written to {args.output_csv}")

if __name__ == "__main__":
    main()