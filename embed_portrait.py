#!/usr/bin/env python3
"""One-time embed of user-owned PNG into the standalone consulting HTML."""
import base64
import sys
from pathlib import Path

HTML = Path(__file__).resolve().parent / "index.html"
REMOTE = "https://hazratmaghaz.tech/images/Hazrat_maghaz_profile_pic_with_no_background.png"

def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: python3 embed_portrait.py /absolute/path/to/portrait.png")
    image = Path(sys.argv[1]).expanduser().resolve()
    if not image.is_file():
        sys.exit(f"Portrait not found: {image}")
    raw = image.read_bytes()
    if not raw.startswith(b"\x89PNG\r\n\x1a\n"):
        sys.exit("Only PNG files are accepted. Portrait was not modified.")
    if len(raw) > 8_000_000:
        sys.exit("Portrait is too large for a single-file site (8 MB maximum).")
    html = HTML.read_text(encoding="utf-8")
    if REMOTE not in html:
        if 'src="data:image/png;base64,' in html:
            sys.exit("Portrait is already embedded. No changes made.")
        sys.exit("Expected portrait reference was not found; leaving site unchanged.")
    data_uri = "data:image/png;base64," + base64.b64encode(raw).decode("ascii")
    HTML.write_text(html.replace(REMOTE, data_uri, 1), encoding="utf-8")
    print(f"Embedded portrait into {HTML} ({len(raw):,} source bytes).")

if __name__ == "__main__":
    main()
