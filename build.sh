#!/bin/bash
set -e

rm -rf dist

npm run build:raw

cp package.json ./dist
cp yarn.lock ./dist
cp README.md ./dist

sed -i '/husky install/d' dist/package.json