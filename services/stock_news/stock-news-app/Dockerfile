FROM node:16.13-alpine

WORKDIR /stock-news-app

COPY . .

RUN npm run build

CMD ["npm", "start"]