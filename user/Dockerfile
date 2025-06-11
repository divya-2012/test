FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS builder
# Copy environment files if they exist
COPY .env* ./
COPY prisma ./prisma/
COPY tsconfig.json .
COPY src ./src/
RUN npm ci
RUN npx prisma generate
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
# Copy environment files again
COPY --from=builder /app/.env* ./

# Copy and make entrypoint executable
COPY entrypoint.sh .
# RUN chmod +x entrypoint.sh

EXPOSE 3000
# Use the entrypoint as the sole command
CMD ["./entrypoint.sh"]