#!/bin/bash
set -e

rm -rf dist

npm run build

cp package.json ./dist
cp package-lock.json ./dist
cp README.md ./dist

cd dist/

npm publish