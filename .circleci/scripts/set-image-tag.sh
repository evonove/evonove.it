#!/bin/bash
#
# Set IMAGE_TAG environment variables for Docker image tagging.
#
# This script determines the appropriate Docker image tag based on the CI context:
# - Git tags: uses the git tag name (e.g., 1.2.3)
# - Main branch: uses 'latest'
# - PR: uses 'pr-<number>'

set -euo pipefail

if [ -n "${CIRCLE_TAG:-}" ]; then
  # Git tag push: use git tag and sha
  echo "export IMAGE_TAG=$CIRLCE_SHA1,$CIRCLE_TAG" >> "$BASH_ENV"
elif [ "$CIRCLE_BRANCH" = "main" ]; then
  # Main branch: use 'latest' and sha
  echo "export IMAGE_TAG=$CIRCLE_SHA1,latest" >> "$BASH_ENV"
else
  # PR: use 'pr-<number>' attaching the tag to 
  # the latest pr branch commit
  PR_NUMBER=${CIRCLE_PULL_REQUEST##*/}
  echo "export IMAGE_TAG=pr-${PR_NUMBER}" >> "$BASH_ENV"
fi