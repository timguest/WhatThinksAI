FROM node:18-alpine

WORKDIR /app/backend

COPY . /app/backend

RUN npm install

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
