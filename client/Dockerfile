FROM node:alpine

RUN apk add --no-cache --virtual .gyp \
        python2 \
        make \
        g++
RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat

WORKDIR /opt/app

COPY package.json /opt/app
COPY yarn.lock /opt/app



RUN yarn install

COPY . /opt/app


CMD [ "yarn", "start" ]