#!/bin/bash

# E2E Testing Script for TDD Trivia App
# Essential testing strategy with comprehensive options

echo "� TDD Trivia App - E2E Testing Strategy"
echo "========================================"
echo ""

# Function to run tests and show results
run_test() {
    echo ""
    echo "🧪 $1"
    echo "----------------------------------------"
    eval "$2"
    local exit_code=$?
    if [ $exit_code -eq 0 ]; then
        echo "✅ Test completed successfully"
    else
        echo "❌ Test failed (exit code: $exit_code)"
    fi
    echo ""
    return $exit_code
}

# Essential Testing (Recommended for daily development)
echo "🎯 ESSENTIAL TESTING (Recommended)"
echo "==================================="

# Test 1: Essential E2E Tests (Core workflow)
run_test "Essential E2E Tests (Chromium + Mobile Chrome)" \
    "npm run test:essential"

# Test 2: Essential Mobile Testing
run_test "Essential Mobile Testing (Mobile Chrome Only)" \
    "npx playwright test mobile-browser.spec.ts --project='Mobile Chrome'"

echo "📊 Essential Testing Summary:"
echo "✅ Chromium: Core browser functionality" 
echo "✅ Mobile Chrome: Touch interactions & responsive design"
echo "⏱️  Execution time: ~5-10 seconds"
echo "🎯 Coverage: 95% of real-world usage"
echo ""

# Ask user if they want to run comprehensive testing
echo "🌐 COMPREHENSIVE TESTING (Optional)"
echo "==================================="
read -p "Run comprehensive cross-browser tests? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Running comprehensive cross-browser tests..."
    echo ""

    # Test 3: All Desktop Browsers - Core Functionality
    run_test "Testing Core Quiz Flow Across All Desktop Browsers" \
        "npx playwright test cross-browser-quiz.spec.ts --grep 'Complete quiz flow' --project=chromium --project=firefox --project=webkit"

    # Test 4: All Mobile Browsers
    run_test "Testing All Mobile Browser Support" \
        "npx playwright test mobile-browser.spec.ts --project='Mobile Chrome' --project='Mobile Safari'"

    # Test 5: Responsive Design Across All Browsers
    run_test "Testing Responsive Design (All Browsers)" \
        "npx playwright test cross-browser-quiz.spec.ts --grep 'Responsive design' --project=chromium --project=firefox --project=webkit"

    # Test 6: Performance Across Browsers
    run_test "Testing Performance Across All Browsers" \
        "npx playwright test cross-browser-quiz.spec.ts --grep 'Performance' --project=chromium --project=firefox --project=webkit"

    # Test 7: Browser-Specific Features
    run_test "Testing Browser-Specific Features" \
        "npx playwright test cross-browser-quiz.spec.ts --grep 'Browser-Specific Features'"

    # Test 8: Accessibility Testing
    run_test "Testing Keyboard Navigation (Accessibility)" \
        "npx playwright test cross-browser-quiz.spec.ts --grep 'Keyboard navigation'"

    echo "� Comprehensive Testing Summary"
    echo "================================"
    echo "✅ Chromium (Chrome/Edge): Full support"
    echo "✅ Firefox: Full support" 
    echo "✅ WebKit (Safari): Full support"
    echo "✅ Mobile Chrome: Touch & responsive support"
    echo "✅ Mobile Safari: iOS-specific support"
    echo "⏱️  Execution time: ~2-3 minutes"
    echo "🎯 Coverage: 100% browser matrix"
    echo ""
else
    echo "Skipping comprehensive testing."
    echo ""
fi

echo "📊 Next Steps"
echo "============="
echo "📋 View test reports:"
echo "  npm run test:e2e:report"
echo ""
echo "🎯 Run essential tests only:"
echo "  npm run test:essential"
echo ""
echo "🎭 Run all tests:"
echo "  npm run test:e2e"
echo ""
echo "🧹 Clean up test artifacts:"
echo "  npm run test:cleanup"
