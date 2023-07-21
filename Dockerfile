FROM node:16

WORKDIR /brondee/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["node", "dist/src/main"]