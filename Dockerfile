FROM node:16.13-alpine

WORKDIR /app_docker

COPY package*.json /app_docker/

RUN npm install

COPY . .

COPY ./dist ./dist
COPY .env .

CMD ["npm", "run", "start:dev"]