#!/bin/bash

cp -R src/migrations dist
cp package.json dist
cp dist/index.js dist/sds-circe-api.js
cp dist/index.js.map dist/sds-circe-api.js.map
rm -rf dist/swagger.yml
