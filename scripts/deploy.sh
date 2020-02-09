#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@188.166.18.204 -p 18665 /bin/bash << EOF
  cd /var/www/circe/api
  docker login repo.treescale.com --username=nulpas --password=$TREESCALE_PS
  docker rm circe-api --force
  docker pull repo.treescale.com/nulpas/sds-circe-api:latest
  docker run --name circe-api -d -p 4009:4009 --network="host" repo.treescale.com/nulpas/sds-circe-api:latest
EOF
