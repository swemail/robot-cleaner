FROM node:16.18.0-alpine3.15

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN yarn

CMD npm run dev