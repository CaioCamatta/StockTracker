# Build
FROM node:lts-alpine3.14 as build-stage
WORKDIR /stock-news-app
ENV PATH /stock-news-app/node_modules/.bin:$PATH
COPY package*.json /stock-news-app/
RUN npm install
COPY . /stock-news-app
RUN npm run build

# Serve
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /stock-news-app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]