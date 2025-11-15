# Stage 1: Build the NestJS app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy package.json for installing only production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# If you have other assets (views, static files)
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 5001

# Run NestJS app
CMD ["node", "dist/main.js"]
