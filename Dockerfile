FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npx", "cross-env", "NODE_ENV=production", "node", "./server.js" ]
