FROM node:18-alpine

# FROM alpine

WORKDIR /node

# RUN apk add npm

COPY package.json ./

RUN npm install && npm cache clean --force

COPY . .

# RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# USER nodeuser

# USER node

EXPOSE 5000

CMD ["node", "index.js"]