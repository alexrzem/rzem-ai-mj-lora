#!/bin/bash
# Development startup script for rzem-ai with auto-reload
# This script will automatically restart the server when code changes

set -e  # Exit on error

echo "======================================================"
echo "       RZEM.AI Development Server"
echo "======================================================"
echo ""

# Check if Node.js and pnpm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please run ./install.sh first"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    echo "Please run ./install.sh first"
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    echo "✓ Loading environment variables from .env"
    set -a
    source .env
    set +a
else
    echo "⚠️  Warning: .env file not found"
    echo "   The server may not work correctly without proper configuration."
    echo "   Consider creating one from .env.example"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Installing now..."
    npm install
    echo ""
fi

# Display startup information
echo "======================================================"
echo "Development Mode"
echo "======================================================"
echo ""

export RUST_LOG=debug
source .env

env

tauri dev

# This will be reached when the user presses Ctrl+C
echo ""
echo "Development stopped."
