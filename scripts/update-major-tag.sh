#!/usr/bin/env bash
#
# Moves (or creates) the floating major version tag (e.g. v1) so it points to
# the latest stable release. Consumers can then use the action with `@v1`.
# Prereleases (e.g. 1.2.0-beta.1) are skipped.

set -euo pipefail

VERSION="${1:-}"

if [[ -z "${VERSION}" ]]; then
  echo "::error::No version was passed as an argument."
  exit 1
fi

if [[ "${VERSION}" == *-* ]]; then
  echo "Prerelease ${VERSION}: skipping major tag update."
  exit 0
fi

MAJOR="v${VERSION%%.*}"

echo "Updating major tag ${MAJOR} -> v${VERSION}"
git tag -f "${MAJOR}"
git push origin "${MAJOR}" --force
