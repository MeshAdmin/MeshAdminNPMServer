# Frontend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/

# Install dependencies
RUN npm ci --only=production

# Development image, copy source code and run with hot-reload
FROM base AS dev
WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
RUN npm ci

COPY packages/frontend/ ./packages/frontend/
WORKDIR /app/packages/frontend

EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
RUN npm ci

COPY packages/frontend/ ./packages/frontend/
WORKDIR /app/packages/frontend

# Build the application
RUN npm run build

# Production image using nginx
FROM nginx:alpine AS runner

# Copy nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of nginx directories
RUN chown -R nextjs:nodejs /var/cache/nginx
RUN chown -R nextjs:nodejs /var/log/nginx
RUN chown -R nextjs:nodejs /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R nextjs:nodejs /var/run/nginx.pid

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["nginx", "-g", "daemon off;"]
