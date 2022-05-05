#!/bin/bash
set -e

rm -rf dist

npm run build:raw

cp package.json ./dist
cp package-lock.json ./dist
cp README.md ./dist

sed -i '/husky install/d' dist/package.json