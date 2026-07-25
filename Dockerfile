# ── Stage 1: Build ──
FROM oven/bun:alpine AS builder

WORKDIR /app

# Copy dependency manifests & lockfile
COPY package.json bun.lock ./

# Install dependencies for build
RUN bun install

# Copy source code and config files
COPY . .

# Build client widget assets into dist/
RUN bun run build

# ── Stage 2: Production Runtime ──
FROM oven/bun:alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy dependency files
COPY package.json bun.lock ./

# Install production dependencies only
RUN bun install --production

# Copy built dist files and server code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY server.js ./

EXPOSE 3000

CMD ["bun", "run", "server.js"]
