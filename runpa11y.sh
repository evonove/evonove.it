#!/usr/bin/env sh
set -eu

RESULTS_DIR="${RESULTS_DIR:-a11y-results}"

mkdir -p "$RESULTS_DIR"

# We need a live server running, here we kill the server at exit
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Here we start a django server instance in background, redirects execution output to the file /tmp/pa11y.log 
# and save the server PID to properly kill it at exit
uv run python django-website/manage.py runserver 0.0.0.0:8000 >/tmp/pa11y.log 2>&1 &
SERVER_PID="$!"

# Wait fore server to be up 
curl -fsS \
  --retry 30 \
  --retry-delay 5 \
  --retry-connrefused \
  "http://localhost:8000/" \
  > /dev/null

cd django-website/frontend
corepack enable
yarn install --immutable

yarn pa11y-ci