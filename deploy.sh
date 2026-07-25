#!/usr/bin/env bash
set -e

echo "🚀 Deploying Intergram Live Chat Server..."

if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    echo "⚠️  .env file not found! Creating from .env.example..."
    cp .env.example .env
    echo "❗ Please edit .env file with your actual TELEGRAM_TOKEN before production use!"
  fi
fi

# Build assets if Bun is available locally
if command -v bun &> /dev/null; then
  echo "📦 Building production assets with Bun..."
  bun run build
fi

# Deploy with Docker Compose
echo "🐳 Launching Docker container..."
docker compose down || true
docker compose up -d --build

echo "✅ Intergram is live and running!"
docker compose ps
