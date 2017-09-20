npm run build
tar -czvf release.tar.gz dist
git add release.tar.gz
git commit -m 'add a new release'
git push
