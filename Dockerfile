FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN corepack enable
RUN yarn 

CMD [ "yarn", "start:dev" ]