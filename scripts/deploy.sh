#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@188.166.18.204 -p 18665 /bin/bash << EOF
  cd /var/www/html/circe/api
  pm2 delete sds-circe.js -s
  rm -rf *
  rm -rf .*
  git clone https://github.com/nulpas/circe-api.git
  cd circe-api
  yarn
  yarn build
  mv dist/* ../
  mv src/migrations ../
  mv node_modules ../
  mv package.json ../
  mv ecosystem.config.js ../
  cd ../
  rm -rf circe-api swagger.yml
  mv index.js sds-circe.js
  mv index.js.map sds-circe.js.map
  export JWT_SECRET=${JWT_SECRET}
  export SALT_ROUNDS=${SALT_ROUNDS}
  export NODE_ENV=${NODE_ENV}
  yarn start:pro
EOF
