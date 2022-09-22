FROM node:alpine

WORKDIR /app1

RUN apk add npm

COPY package.json /app1

RUN npm install && npm cache clean --force

COPY . /app1

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 5000

CMD ["node", "index.js"]