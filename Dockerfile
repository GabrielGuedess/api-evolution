FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

USER node

CMD [ "yarn", "dev" ]
