#!/bin/bash
set -e

echo "🧹 Cleaning..."
rm -rf dist

echo "🏗️ Building..."
npm run build

echo "📋 Copying manifest..."
cp manifest.json dist/

echo "🖼️ Copying icons..."
cp public/icon*.png dist/ 2>/dev/null || true
cp public/favicon.ico dist/ 2>/dev/null || true
cp public/profile.svg dist/ 2>/dev/null || true

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Extension ready!"
echo "📂 Load:"
echo "   $(pwd)/dist"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"