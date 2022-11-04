FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

USER root

CMD [ "yarn", "dev" ]
