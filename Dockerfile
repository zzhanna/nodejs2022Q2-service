FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --legacy-peer-deps


COPY . .
ENV NODE_ENV=${NODE_ENV}

EXPOSE ${PORT:-4000}

CMD ["npm", "run", "start:dev"]