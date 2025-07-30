#!/usr/bin/env bash set -euo pipefail

1. Create and activate a Python virtual environment

python3 -m venv venv source venv/bin/activate

2. Upgrade pip & install Python dependencies

pip install --upgrade pip pip install 
requests 
beautifulsoup4 
pandas 
sentence-transformers 
scikit-learn 
pdfplumber 
huggingface_hub

3. Download the all-MiniLM-L12-v2 model via Hugging Face hub (no Git LFS required)

python3 - << 'EOF' from huggingface_hub import snapshot_download

This will download model files into ./all-MiniLM-L12-v2

snapshot_download( repo_id="sentence-transformers/all-MiniLM-L12-v2", local_dir="all-MiniLM-L12-v2", local_dir_use_symlinks=False ) EOF

echo "Done! Model is in ./all-MiniLM-L12-v2 and venv is ready."

