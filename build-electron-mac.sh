#!/bin/bash

# MeshAdmin Electron Production Build Script for macOS
# This script builds a production-ready Electron app

set -e  # Exit on error

echo "🚀 Starting MeshAdmin Electron Production Build for macOS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "pnpm-workspace.yaml" ]; then
    echo -e "${RED}Error: Must be run from the project root directory${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
pnpm install

echo -e "${YELLOW}Step 2: Building shared package...${NC}"
cd packages/shared
pnpm run build || echo "Shared package build skipped (no build script)"
cd ../..

echo -e "${YELLOW}Step 3: Building backend...${NC}"
cd packages/backend
pnpm run build
cd ../..

echo -e "${YELLOW}Step 4: Building frontend...${NC}"
cd packages/frontend
pnpm run build
cd ../..

echo -e "${YELLOW}Step 5: Setting up Electron package...${NC}"
cd packages/electron

# Install Electron dependencies
echo "Installing Electron dependencies..."
npm install

echo -e "${YELLOW}Step 6: Creating production environment file...${NC}"
cat > ../backend/.env.production << EOF
NODE_ENV=production
PORT=3001
DATABASE_URL="file:./meshadmin.db"
JWT_SECRET="$(openssl rand -base64 32)"
REDIS_HOST=localhost
REDIS_PORT=6379
EOF

echo -e "${YELLOW}Step 7: Creating app icon (placeholder)...${NC}"
mkdir -p assets
# Create a simple placeholder icon (you should replace this with your actual icon)
echo "Note: Using placeholder icon. Replace assets/icon.png and assets/icon.icns with your actual app icons"
touch assets/icon.png
touch assets/icon.icns

echo -e "${YELLOW}Step 8: Building Electron app for macOS...${NC}"
npm run dist:mac

echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""
echo "📦 Your macOS app is ready in: packages/electron/dist/"
echo ""
echo "Available files:"
ls -la dist/*.dmg 2>/dev/null && echo "  - DMG installer found"
ls -la dist/*.zip 2>/dev/null && echo "  - ZIP archive found"
echo ""
echo "To install:"
echo "  1. Open the .dmg file"
echo "  2. Drag MeshAdmin to your Applications folder"
echo "  3. Run MeshAdmin from Applications"
echo ""
echo -e "${YELLOW}Note: The app is not code-signed. You may need to allow it in System Preferences > Security & Privacy${NC}"
