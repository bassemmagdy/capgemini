FROM node:fermium-alpine AS builder
# set work directory
WORKDIR /app

#copy package.json to install packages
COPY package.json .
RUN npm install

COPY . .
# build app to serve it later over nginx
RUN npm run build
# use nginx as run time to serve the app
FROM nginx:alpine

COPY --from=builder /app/dist/app/* /usr/share/nginx/html/