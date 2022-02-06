#syntax=docker/dockerfile:1.0

FROM node:17-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run start


