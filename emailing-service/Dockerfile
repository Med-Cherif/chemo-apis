FROM node:16-alpine

RUN npm install -g typescript

RUN npm install -g nodemon

RUN npm install -g ts-node

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD [ "yarn", "run", "dev" ]