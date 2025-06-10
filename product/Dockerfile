FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS builder
RUN npm ci
COPY . .
# Ensure all files are copied properly
RUN ls -la /app/src/repositories && ls -la /app/src/schemas
RUN npx prisma generate
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 3001
CMD ["npm", "start"]