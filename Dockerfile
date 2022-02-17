FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3000
ENV NODE_VERSION=16.13.2

EXPOSE $PORT

CMD ["node", "server.js"]