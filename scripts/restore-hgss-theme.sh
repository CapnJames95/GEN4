#!/usr/bin/env bash
# Restore the Gen 4 theme-override <link> tag in HGSSIronmonMap/index.html.
# A fresh React build of kelseyyoung/HGSSIronmonMap regenerates index.html
# without our injected stylesheet. Run this script after any rebuild.
#
# Usage:
#   ./scripts/restore-hgss-theme.sh
#
# Idempotent: if the link is already present it does nothing.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INDEX="$ROOT/HGSSIronmonMap/index.html"
OVERRIDE="$ROOT/HGSSIronmonMap/theme-override.css"

if [ ! -f "$INDEX" ]; then
  echo "error: $INDEX not found" >&2
  exit 1
fi
if [ ! -f "$OVERRIDE" ]; then
  echo "error: $OVERRIDE not found — make sure theme-override.css is preserved across rebuilds" >&2
  exit 1
fi

if grep -q "theme-override.css" "$INDEX"; then
  echo "ok — theme-override link already present in $INDEX"
  exit 0
fi

# Inject the link tag immediately after the existing main CSS link.
python3 - "$INDEX" <<'PY'
import sys, re
p = sys.argv[1]
src = open(p).read()
m = re.search(r'(<link\s+href="\./static/css/main\.[a-f0-9]+\.css"\s+rel="stylesheet"\s*/?>)', src)
if not m:
    sys.exit("could not locate main CSS link to inject after")
new = src[:m.end()] + '<link href="./theme-override.css" rel="stylesheet">' + src[m.end():]
open(p, 'w').write(new)
print(f"injected theme-override link into {p}")
PY
