FROM node:12.16.1-alpine3.9

RUN apk add bash

RUN npm install pm2 -g

COPY ./apps /apps

#API
WORKDIR /apps/api
RUN npm install
RUN npm run build

#Frontend
WORKDIR /apps/frontend
RUN npm install
RUN npm run build

#Start
WORKDIR /apps/api/dist

CMD ["pm2-runtime", "start", "index.js"]
