FROM node:5.1.1
MAINTAINER Kevin Hyland <khy@me.com>

WORKDIR /web/useless
COPY . .

RUN npm install
RUN npm run webpack-docker

EXPOSE 3000
CMD ["node", "app.js"]
