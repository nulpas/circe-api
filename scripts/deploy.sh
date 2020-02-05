#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@3.125.13.215 /bin/bash << EOF
  cd /var/www/html/api
  pm2 delete stey-playbool.js -s
  rm -rf *
  rm -rf .*
  git clone https://github.com/mpastor-stratio/ey-docs-api.git
  cd ey-docs-api
  yarn
  yarn build
  mv dist/* ../
  mv src/migrations ../
  mv node_modules ../
  mv package.json ../
  mv ecosystem.config.js ../
  cd ../
  rm -rf ey-docs-api swagger.yml
  mv index.js stey-playbool.js
  mv index.js.map stey-playbool.js.map
  export JWT_SECRET=${JWT_SECRET}
  export SALT_ROUNDS=${SALT_ROUNDS}
  export NODE_ENV=${NODE_ENV}
  yarn start:pro
EOF
