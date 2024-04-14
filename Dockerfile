FROM node:16.13-alpine

WORKDIR /app
COPY package*.json ./
COPY config.yaml ./dist/config.yaml
RUN npm install
COPY . .

RUN npm run build

ENV PORT=3000
ENV POSTGRES_HOST=postgres
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=123
ENV POSTGRES_DB=e-commerce_db

EXPOSE 3000

CMD ["npm", "run", "start:prod"]