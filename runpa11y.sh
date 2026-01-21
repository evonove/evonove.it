#!/usr/bin/env sh
set -eu

RESULTS_DIR="${RESULTS_DIR:-a11y-results}"
SERVER_URL="${SERVER_URL:-http://127.0.0.1:8000/}"
WAIT_SECONDS="${WAIT_SECONDS:-30}"

mkdir -p "$RESULTS_DIR"

# We need a live server running, here we kill the server at exit
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

uv run python django-website/manage.py migrate
uv run python django-website/manage.py init_site
# Here we start a django server instance in background, redirects execution output to the file /tmp/pa11y.log 
# and save the server PID to properly kill it at exit
uv run python django-website/manage.py runserver 0.0.0.0:8000 >/tmp/pa11y.log 2>&1 &
SERVER_PID="$!"

# Wait for server to be up 
echo "Waiting for server at $SERVER_URL (timeout ${WAIT_SECONDS}s)..."
i=0
while ! curl -fsS "$SERVER_URL" >/dev/null 2>&1; do
  i=$((i + 1))

  # If the server crashed, stop immediately
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "Server exited early. /tmp/pa11y.log:" >&2
    exit 1
  fi

  # Same if timed out
  if [ "$i" -ge "$WAIT_SECONDS" ]; then
    echo "Timed out waiting for server. /tmp/pa11y.log:" >&2
    exit 1
  fi

  sleep 1
done

cd django-website/frontend
corepack enable
yarn install --immutable

yarn pa11y-ci