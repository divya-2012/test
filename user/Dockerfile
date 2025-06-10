# Base image
FROM node:20-alpine AS base
# Create app directory
WORKDIR /app
# Install dependencies for production only
COPY package*.json ./
# Install dev dependencies for building
FROM base AS builder
RUN npm ci
# Copy source code
COPY . .
# Generate prisma client
RUN npx prisma generate
# Build the app
RUN npm run build

# Production image
FROM base AS production
# Set NODE_ENV
ENV NODE_ENV=production
# Install production dependencies only
RUN npm ci --production
# Copy build artifacts and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Expose port
EXPOSE 3000
# Start the server
CMD ["npm", "start"]
