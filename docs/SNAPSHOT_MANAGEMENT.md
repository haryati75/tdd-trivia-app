# E2E Snapshot Management Guide

This guide explains how to properly manage Playwright E2E test snapshots and prevent accidental commits of test artifacts.

> 🎯 **Essential Testing Note**: Visual regression tests are automatically skipped in essential testing mode for faster, more reliable execution. See [Testing Strategy](./TESTING_STRATEGY.md) for complete workflow details.

## 🚫 What NOT to Commit

### Automatically Generated Files

- `test-results/` - Test execution results
- `playwright-report/` - HTML test reports
- `**/*-actual.png` - Failed test screenshots
- `**/*-diff.png` - Visual diff images
- `*.webm` - Test execution videos
- `trace.zip` - Playwright traces
- `blob-report/` - Raw test data

### Why These Should Be Excluded

1. **Large file sizes** - Can quickly bloat repository
2. **Sensitive data** - May contain user information
3. **Environment-specific** - Results vary by machine/OS
4. **Temporary** - Only useful for immediate debugging

## ✅ What TO Commit (Optional)

### Baseline Screenshots (If Using Visual Regression)

- `e2e/**/*-linux.png` - Linux baseline images
- `e2e/**/*-darwin.png` - macOS baseline images
- `e2e/**/*-win32.png` - Windows baseline images

**Note**: Only commit these if you're intentionally using visual regression testing.

## 🎯 Testing Mode Overview

For complete details on essential vs comprehensive testing, see [Testing Strategy](./TESTING_STRATEGY.md).

### Essential Testing (Default)

- **Visual regression**: Automatically skipped
- **Use case**: Daily development, fast feedback
- **Commands**: See [Development Setup](./DEVELOPMENT_SETUP.md)

### Comprehensive Testing (Manual)

- **Visual regression**: Enabled with baseline comparisons
- **Use case**: Pre-release validation, UI consistency checks

## 🛡️ Safeguards in Place

### 1. Enhanced .gitignore

The `.gitignore` file excludes common test artifacts:

```gitignore
# E2E Test Artifacts
**/test-results/
**/playwright-report/
**/*.webm
**/trace.zip
e2e/**/*-actual.png
e2e/**/*-diff.png
```

### 2. Pre-commit Hook

Automatically checks for test artifacts before each commit:

```bash
# Runs automatically on git commit
# Prevents commits containing test artifacts
```

### 3. Cleanup Script

Easy command to remove all test artifacts:

```bash
npm run test:cleanup
```

## 🔧 Managing Snapshots

### Essential Testing Commands

For daily development, see [Development Setup](./DEVELOPMENT_SETUP.md) for complete command reference.

### Visual Regression Testing (Comprehensive)

For comprehensive testing with visual comparison:

```bash
# Generate initial baseline screenshots (comprehensive mode)
PLAYWRIGHT_ESSENTIAL_ONLY=false npx playwright test --update-snapshots

# Run tests with visual comparison
npm run test:e2e  # Comprehensive testing

# Update specific snapshots
PLAYWRIGHT_ESSENTIAL_ONLY=false npx playwright test --update-snapshots path/to/test.spec.ts
```

### Best Practices

1. **Use essential testing for daily development** - Skip visual regression for speed
2. **Generate baselines locally** on your primary development OS (when needed)
3. **Review visual changes** carefully before updating baselines
4. **Use CI for validation** but not baseline generation
5. **Keep baselines minimal** - only for critical UI elements
6. **Mask dynamic content** - We automatically mask random answer feedback

## 🚀 Workflow Commands

### Daily Development

See [Development Setup](./DEVELOPMENT_SETUP.md) for complete workflow commands and debugging options.

### Visual Regression Specific Commands

```bash
# Run comprehensive tests with visual regression
npm run test:e2e

# Update visual baselines if UI changes are intentional
PLAYWRIGHT_ESSENTIAL_ONLY=false npx playwright test --update-snapshots
```

## 🔍 Snapshot Configuration

### Current Settings

- **Screenshots**: Taken only on failure (essential), or for comparison (comprehensive)
- **Videos**: Recorded on failure
- **Traces**: Collected on retry
- **Threshold**: 0.2 (20% difference tolerance)
- **Masking**: Answer feedback area masked to handle random content

### Essential vs Comprehensive Mode

```typescript
// Essential testing (automatic)
test.skip(
  process.env.PLAYWRIGHT_ESSENTIAL_ONLY === "true",
  "Visual regression disabled for essential testing"
);

// Visual regression with masking (comprehensive)
await expect(page).toHaveScreenshot("test.png", {
  mask: [page.getByTestId("answer-feedback")], // Masks random emoji/messages
});
```

### Customizing Snapshot Behavior

In `playwright.config.ts`:

```typescript
use: {
  // Screenshot settings
  screenshot: 'only-on-failure',

  // Video settings
  video: 'retain-on-failure',

  // Trace settings
  trace: 'on-first-retry',
}
```

## 🚨 Emergency: Accidentally Committed Artifacts

If you accidentally commit test artifacts:

```bash
# Remove from last commit (if not pushed)
git reset --soft HEAD~1
npm run test:cleanup
git add .
git commit -m "Your original message"

# Remove specific files from git tracking
git rm --cached test-results/
git rm --cached playwright-report/
git commit -m "Remove test artifacts"

# For already pushed commits
git filter-branch --index-filter 'git rm --cached --ignore-unmatch test-results/' HEAD
```

## 📝 CI/CD Considerations

### GitHub Actions: Essential Testing (Automatic)

Our CI automatically uses essential testing (no visual regression):

```yaml
- name: Run essential E2E tests
  run: npx playwright test --project=chromium --reporter=github
  env:
    PLAYWRIGHT_ESSENTIAL_ONLY: "true" # Skips visual regression

- name: Upload test artifacts (on failure)
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: essential-e2e-results
    path: |
      test-results/
      playwright-report/
    retention-days: 7
```

### Manual Workflows: Comprehensive Testing

For manual workflows that include visual regression:

```yaml
- name: Run comprehensive E2E tests
  run: npx playwright test
  # PLAYWRIGHT_ESSENTIAL_ONLY not set = visual regression enabled
```

### Key Points

- Store artifacts as CI artifacts, not in repository
- Set retention periods for automatic cleanup
- Only upload on failure to save storage

## 🔄 Regular Maintenance

### Weekly Cleanup

```bash
# Remove old test artifacts
npm run test:cleanup

# Check repository size
du -sh .git/

# Clean git history if needed (extreme measure)
git gc --prune=now --aggressive
```

This setup ensures your repository stays clean while maintaining full E2E testing capabilities! 🎯
