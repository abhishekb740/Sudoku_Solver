FROM node:16.15.1-buster-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
CMD ["node", "app.js"]