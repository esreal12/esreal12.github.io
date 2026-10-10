#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_USER:?DEPLOY_USER is required}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required}"

if [[ "${DEPLOY_PATH}" != /* || "${DEPLOY_PATH}" == "/" || "${DEPLOY_PATH}" == *".."* ]]; then
  echo "DEPLOY_PATH must not be /, must be absolute, and must not contain .." >&2
  exit 1
fi

: "${DEPLOY_CONFIRM:?DEPLOY_CONFIRM is required}"

if [[ "${DEPLOY_CONFIRM}" != "dedicated-portfolio-root" ]]; then
  echo "DEPLOY_CONFIRM must equal dedicated-portfolio-root" >&2
  exit 1
fi

test -d dist
test -f dist/.htaccess

command -v rsync >/dev/null

rsync -az --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
