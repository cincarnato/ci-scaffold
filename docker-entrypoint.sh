#!/bin/sh

cd /apps/api

npm run init
npm run init

cd /apps/api/dist

pm2-runtime start index.js --name ciudadano