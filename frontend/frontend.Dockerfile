FROM node:18-alpine

WORKDIR /app/frontend

COPY . /app/frontend

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]