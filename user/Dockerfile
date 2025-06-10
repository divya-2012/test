FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS builder
# Pass build-time args
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS production
# Pass runtime environment variables
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/index.js"]