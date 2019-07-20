ARG NODE=10.3.0

FROM node:$NODE-alpine

RUN apk --update --no-cache add \
  git \
  g++ \
  make \
  python && \
  npm install -g node-gyp

WORKDIR /code

COPY package*.json /code/

RUN npm i && \
  ./node_modules/pm2/bin/pm2 install pm2-intercom
