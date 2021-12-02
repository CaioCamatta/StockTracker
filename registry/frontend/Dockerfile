# Build
FROM node:lts-alpine3.14 as build-stage

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# Serve
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]