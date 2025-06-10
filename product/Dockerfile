FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
COPY tsconfig.json .
COPY src ./src/

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD ["node", "dist/index.js"]