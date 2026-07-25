# ── Stage 1: Build ──
FROM oven/bun:1.1-alpine AS builder

WORKDIR /app

# Copy dependency manifests & lockfile
COPY package.json bun.lock ./

# Install all dependencies (including devDependencies for build)
RUN bun install --frozen-lockfile

# Copy source code and config files
COPY . .

# Build client widget assets into dist/
RUN bun run build

# ── Stage 2: Production Runtime ──
FROM oven/bun:1.1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy dependency files
COPY package.json bun.lock ./

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Copy built dist files and server code
COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 3000

CMD ["bun", "run", "server.js"]
