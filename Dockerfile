FROM node:12.16.1-alpine3.9

RUN apk add bash

RUN npm install pm2 -g

#API
COPY ./apps/api/ /app/api/

WORKDIR /app/api

RUN npm install
RUN npm run build

#Frontend
COPY ./apps/frontend/ /app/frontend/
WORKDIR /app/api/dist/frontend
RUN npm install
RUN npm run build


#Start
WORKDIR /app/api/dist
EXPOSE 80

CMD ["pm2-runtime", "start", "index.js"]
