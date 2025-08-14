# Multi-stage Dockerfile for optimized production image

# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml* ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/prisma ./packages/backend/prisma/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/backend/node_modules ./packages/backend/node_modules

# Copy source code
COPY package.json pnpm-lock.yaml* ./
COPY packages/backend/ ./packages/backend/

# Generate Prisma client
WORKDIR /app/packages/backend
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 3: Production Runner
FROM node:18-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application and dependencies
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/prisma ./prisma
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/node_modules/.prisma ./node_modules/.prisma

# Switch to non-root user
USER nodejs

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["npm", "start"]
