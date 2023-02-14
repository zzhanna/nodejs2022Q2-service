FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.example .env

EXPOSE ${PORT: -4000}

CMD [ "npm", "run", "start:dev" ]