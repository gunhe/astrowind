FROM node:lts AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
# 设置 npm 为清华镜像源，加速依赖安装
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS deploy
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
