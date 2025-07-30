#!/usr/bin/env bash
set -euo pipefail

# 1. Clone the SBERT repo (requires Git LFS)
echo "Cloning all-MiniLM-L12-v2 model…"
git lfs install
git clone https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2

# 2. Create virtualenv & activate
echo "Setting up virtual environment…"
python3 -m venv venv
source venv/bin/activate

# 3. Upgrade pip & install dependencies
echo "Installing Python dependencies…"
pip install --upgrade pip
pip install \
  requests \
  beautifulsoup4 \
  pandas \
  sentence-transformers \
  scikit-learn

echo "Done!  Model is in ./all-MiniLM-L12-v2 and venv is ready."