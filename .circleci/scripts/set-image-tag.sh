#!/bin/bash
#
# Set IMAGE_TAG and IMAGE_TAG_SHA environment variables for Docker image tagging.
#
# This script determines the appropriate Docker image tag based on the CI context:
# - Git tags: Uses the tag name (e.g., v1.2.3)
# - Main branch: Uses 'latest'
# - PR: Uses 'pr-<number>'

set -euo pipefail

if [ -n "${CIRCLE_TAG:-}" ]; then
  # Git tag push: use tag name as primary, SHA as secondary
  echo "export IMAGE_TAG=$CIRCLE_TAG" >> "$BASH_ENV"
  echo "export IMAGE_TAG_SHA=$CIRCLE_SHA1" >> "$BASH_ENV"
elif [ "$CIRCLE_BRANCH" = "main" ]; then
  # Main branch: use 'latest' as primary, SHA as secondary
  echo "export IMAGE_TAG=latest" >> "$BASH_ENV"
else
  # PR: use 'pr-<number>' attaching the tag to 
  # the latest pr branch commit
  PR_NUMBER=${CIRCLE_PULL_REQUEST##*/}
  if [ -z "$PR_NUMBER" ]; then
    echo "Error: No PR number found. Ensure a PR is open."
    exit 1
  fi
  echo "export IMAGE_TAG=pr-${PR_NUMBER}" >> "$BASH_ENV"
fi