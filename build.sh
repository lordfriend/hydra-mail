#!/bin/sh

set -e

npm run build
rm release.tar.gz
tar -czvf release.tar.gz dist
git add release.tar.gz
git commit -m 'add a new release'
git push
