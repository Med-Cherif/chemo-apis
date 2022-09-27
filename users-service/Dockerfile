FROM node:14-alpine

RUN npm install -g typescript

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD [ "yarn", "run", "dev" ]