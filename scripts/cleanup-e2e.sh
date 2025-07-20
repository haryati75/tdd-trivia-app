#!/bin/bash

# E2E Test Cleanup Script
# Removes all generated test artifacts to keep the repository clean

echo "🧹 Cleaning up E2E test artifacts..."

# Function to safely remove files/directories
safe_remove() {
    if [ -e "$1" ]; then
        echo "  Removing: $1"
        rm -rf "$1"
    fi
}

# Remove Playwright generated directories
safe_remove "test-results"
safe_remove "playwright-report"
safe_remove "blob-report"

# Remove common test artifact patterns
echo "  Removing video files..."
find . -name "*.webm" -type f -delete 2>/dev/null || true

echo "  Removing screenshot files..."
find . -name "*-actual.png" -type f -delete 2>/dev/null || true
find . -name "*-diff.png" -type f -delete 2>/dev/null || true
find . -name "screenshot*.png" -type f -delete 2>/dev/null || true

echo "  Removing trace files..."
find . -name "trace.zip" -type f -delete 2>/dev/null || true

# Remove any remaining test result directories
find . -type d -name "test-results" -exec rm -rf {} + 2>/dev/null || true

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "💡 Tip: Run this script before committing to ensure no test artifacts are included:"
echo "   npm run test:cleanup"
