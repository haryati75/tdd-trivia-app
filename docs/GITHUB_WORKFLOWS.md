# GitHub Workflows Guide 🔄

This guide explains the GitHub Actions workflows for automated testing and deployment.

## 🎯 Workflow Strategy

### **Development Workflow (Automatic)**

1. **Code Changes** → `all-tests.yml` triggers automatically
2. **PR Creation** → `pr-preview.yml` provides validation

### **Quality Assurance (Manual)**

- **Essential Testing**: `lite-cross-browser-tests.yml` (manual trigger)
- **Pre-Release**: `comprehensive-cross-browser-tests.yml` (manual trigger)

## � Active Workflows (5 Total)

### �🔄 Automatic Workflows (Free Tier)

#### 1. `all-tests.yml` - Essential Tests (Fast) ⭐

**Triggers**: Push to main, Pull Requests
**Purpose**: Fast feedback loop for development

| Job             | Purpose                     | Duration | Cost |
| --------------- | --------------------------- | -------- | ---- |
| `unit-tests`    | Unit tests with coverage    | ~3 min   | Free |
| `essential-e2e` | Chromium E2E tests          | ~8 min   | Free |
| `mobile-check`  | Mobile Chrome compatibility | ~5 min   | Free |
| `test-summary`  | Results aggregation         | ~1 min   | Free |

**Key Features**:

- ✅ **Essential browsers only**: Chromium + Mobile Chrome
- ✅ **Visual regression tests skipped**: Fast, reliable execution
- ✅ **Smart caching**: Playwright browsers cached
- ✅ **Artifact upload**: Only on failure to save space
- ✅ **Coverage reporting**: Automatic codecov integration

```yaml
# Environment variables set automatically
PLAYWRIGHT_ESSENTIAL_ONLY: "true" # Skips visual regression tests
```

#### 2. `pr-preview.yml` - PR Validation

**Triggers**: PR creation
**Purpose**: Basic validation and preview
**Duration**: ~5 minutes
**Cost**: Free tier

### ⚡ Manual Workflows (On-Demand)

#### 3. `lite-cross-browser-tests.yml` - Essential Testing

**Triggers**: Manual dispatch
**Purpose**: Essential cross-browser validation

| Browser       | Platform | Duration |
| ------------- | -------- | -------- |
| Chromium      | Ubuntu   | ~20 min  |
| Firefox       | Ubuntu   | ~20 min  |
| Mobile Chrome | Ubuntu   | ~15 min  |

**Total**: ~67 minutes (~$0.54/run for private repos)

**When to use**:

- Before major releases
- When browser-specific issues are suspected
- Periodic quality validation

#### 4. `comprehensive-cross-browser-tests.yml` - Full Testing

**Triggers**: Manual only
**Purpose**: Complete browser matrix validation

| Test Type       | Browsers                        | Features               |
| --------------- | ------------------------------- | ---------------------- |
| **Desktop**     | Chromium, Firefox, WebKit, Edge | Full matrix            |
| **Mobile**      | Mobile Chrome, Mobile Safari    | Touch interactions     |
| **Visual**      | All browsers                    | Screenshot comparisons |
| **Performance** | All browsers                    | Load time validation   |

**Total**: ~500+ minutes (~$4+/run for private repos)

**When to use**:

- Pre-release validation
- Major feature launches
- Comprehensive quality assurance

#### 5. `deploy.yml` - Deployment

**Triggers**: Manual/Release
**Purpose**: Production deployment
**Duration**: ~3 minutes
**Cost**: Free tier

## 💰 Cost Analysis

### GitHub Actions Pricing (Private Repos)

- **Free tier**: 2,000 minutes/month
- **Overage rate**: $0.008/minute

### Usage Estimate

| Workflow Type         | Frequency           | Annual Minutes | Annual Cost    |
| --------------------- | ------------------- | -------------- | -------------- |
| **Automatic**         | 20 PRs/pushes/month | 4800-7200 min  | $0 (free tier) |
| **Essential Testing** | As needed           | Variable       | ~$0.54/run     |
| **Comprehensive**     | 4x yearly           | 2000+ min      | ~$16/year      |

**Result**: Automatic workflows stay within free tier, manual testing costs only when used.

## 🎯 Workflow Optimization Features

### Smart Caching Strategy

```yaml
# Playwright browsers cached by version
key: playwright-essential-${{ runner.os }}-${{ steps.playwright-version.outputs.version }}
```

### Conditional Test Execution

```yaml
# Skip visual regression in essential testing
PLAYWRIGHT_ESSENTIAL_ONLY: "true"
```

### Parallel Job Execution

- All workflows use parallel jobs for optimal speed
- Matrix strategies for browser isolation
- Smart dependency management

### Artifact Management

- **Upload on failure only**: Saves storage space
- **7-day retention**: Automatic cleanup
- **Organized naming**: Easy identification

## 🛠️ Enabling Optional Features

### Comprehensive Testing Triggers

Add to `comprehensive-cross-browser-tests.yml` for additional triggers:

```yaml
# Optional: Enable for release events
# release:
#   types: [published]
```

## 📊 Monitoring & Reporting

### Test Summary Features

- **Status table**: Clear pass/fail status for each job
- **Duration tracking**: Performance monitoring
- **Cost estimates**: Budget awareness
- **Next steps**: Actionable recommendations

### Coverage Reporting

- **Codecov integration**: Automatic coverage tracking
- **Trend analysis**: Coverage changes over time
- **Branch protection**: Minimum coverage requirements

### Artifact Access

- **Test reports**: HTML reports for detailed analysis
- **Screenshots**: Visual debugging on failures
- **Traces**: Playwright execution traces
- **Videos**: Test execution recordings

## 🎯 Best Practices

### For Daily Development

- Rely on automatic workflows (`all-tests.yml`)
- Use essential testing for local validation
- Monitor coverage trends

### For Quality Assurance

- Run `lite-cross-browser-tests.yml` before releases
- Use `comprehensive-cross-browser-tests.yml` for major features
- Review test artifacts on failures

### For Cost Management

- Keep automatic workflows lean (essential testing only)
- Use manual workflows judiciously
- Monitor usage in GitHub billing as needed

This workflow strategy provides fast feedback for development while maintaining comprehensive quality assurance capabilities when needed.
**Purpose**: Cost-effective cross-browser validation

#### Jobs:

- **essential-e2e**: Chromium + Firefox testing (Ubuntu)
- **mobile-check**: Mobile Chrome compatibility
- **lite-summary**: Results summary and recommendations

#### Key Features:

- 💰 **Cost-optimized** (~67 minutes, stays in free tier)
- 🎯 **Essential browsers** only (Chromium, Firefox)
- 📱 **Mobile compatibility** check
- 🔧 **Manual control** with future automation option

### 3. `comprehensive-cross-browser-tests.yml` - Full Testing

**Triggers**: Manual dispatch only
**Purpose**: Thorough cross-platform validation for releases

#### Jobs:

- **comprehensive-e2e**: Multi-OS, multi-browser matrix
- **performance-benchmarks**: Performance validation
- **visual-regression**: UI consistency checks
- **test-summary**: Report generation and issue creation

#### Key Features:

- 🌍 **Multi-OS testing** (Ubuntu, Windows, macOS)
- 📱 **Complete mobile browser** simulation
- 🎯 **Performance benchmarking**
- 🎨 **Visual regression detection**
- 🚨 **Automatic issue creation** on failures

## 🎯 Testing Strategy

### Browser Coverage Matrix

| Browser       | Main CI | Lite Tests | Comprehensive | Visual |
| ------------- | ------- | ---------- | ------------- | ------ |
| Chromium      | ✅      | ✅         | ✅            | ✅     |
| Firefox       | ✅      | ✅         | ✅            | ✅     |
| WebKit        | ✅      | ❌         | ✅            | ✅     |
| Mobile Chrome | ✅      | ✅         | ✅            | ❌     |
| Mobile Safari | ✅      | ❌         | ✅            | ❌     |

### Operating System Coverage

| OS      | Main CI | Lite Tests | Comprehensive |
| ------- | ------- | ---------- | ------------- |
| Ubuntu  | ✅      | ✅         | ✅            |
| Windows | ❌      | ❌         | ✅            |
| macOS   | ❌      | ❌         | ✅            |

### Testing Approach

#### **Development Phase** (Automatic)

- `all-tests.yml` runs on every PR/push
- Fast feedback loop (~15 minutes)
- Essential browser coverage on Ubuntu

#### **Pre-Release Validation** (Manual)

- `lite-cross-browser-tests.yml` for quick validation
- Essential browsers + mobile check (~67 minutes)
- Cost-effective testing within free tier

#### **Release Preparation** (Manual)

- `comprehensive-cross-browser-tests.yml` for full validation
- Complete browser matrix + performance + visual regression
- Enterprise-grade testing (~500+ minutes)

## 🚀 Optimization Features

### 1. Smart Caching

- **Browser binaries**: Cached by version and OS
- **Node modules**: NPM cache integration
- **Playwright dependencies**: OS-specific caching

### 2. Efficient Resource Usage

- **Fail-fast disabled**: Continue testing other browsers on failure
- **Conditional uploads**: Artifacts only uploaded on failure
- **Retention policies**: 7-30 days based on artifact type

### 3. Performance Optimizations

- **Parallel jobs**: Up to 3 browsers simultaneously
- **Matrix strategy**: Isolated browser environments
- **Timeout controls**: Prevent hanging jobs

## 📊 Reporting & Monitoring

### GitHub Actions Integration

```yaml
# Clean GitHub Actions output
--reporter=github

# Step summaries with markdown
echo "## Results" >> $GITHUB_STEP_SUMMARY
```

### Artifact Management

- **Test results**: 7-day retention
- **Performance data**: 30-day retention
- **Visual diffs**: 14-day retention
- **Coverage reports**: Uploaded to Codecov

### Issue Automation

- **Nightly failures**: Auto-create GitHub issues
- **Performance regressions**: Flagged in reports
- **Visual changes**: Diff images in artifacts

## 🔧 Configuration Details

### Environment Variables

```yaml
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: 1 # Use cached browsers
PLAYWRIGHT_REPORT_SLOW_TESTS: "null" # Reduce noise
```

### Cache Keys

```yaml
# Browser cache
playwright-${{ runner.os }}-${{ matrix.browser }}-${{ version }}

# Node modules
node-${{ hashFiles('package-lock.json') }}
```

### Timeout Strategy

- **Unit tests**: Default (no explicit timeout)
- **E2E tests**: 30 minutes
- **Nightly tests**: 45 minutes
- **Performance tests**: 20 minutes

## 🛠️ Maintenance Commands

### Manual Workflow Triggers

```bash
# Trigger lite cross-browser tests
gh workflow run lite-cross-browser-tests.yml

# Trigger comprehensive tests manually
gh workflow run comprehensive-cross-browser-tests.yml

# Run comprehensive tests with specific browser matrix
gh workflow run comprehensive-cross-browser-tests.yml -f browser_matrix=desktop-only
```

### Local Debugging

```bash
# Run same tests as CI
npm run test:e2e:chrome
npm run test:e2e:firefox
npm run test:e2e:safari

# Performance testing
npx playwright test --grep="Performance"

# Visual regression
npx playwright test --grep="Visual Regression"
```

### Cache Management

```bash
# Clear Playwright cache locally
npx playwright uninstall --all
rm -rf ~/.cache/ms-playwright

# Force cache refresh in CI
# Edit workflow to change cache key
```

## 🚨 Troubleshooting

### Common CI Issues

#### 1. Browser Installation Failures

```yaml
# Solution: Update browser versions
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium firefox webkit
```

#### 2. Timeout Issues

```yaml
# Solution: Adjust timeouts
timeout-minutes: 45 # Increase from 30
```

#### 3. Flaky Tests

```yaml
# Solution: Add retries
retries: process.env.CI ? 2 : 0
```

#### 4. Cache Misses

```yaml
# Solution: Improve cache keys
key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}-${{ steps.playwright-version.outputs.version }}
```

### Performance Issues

#### 1. Slow Test Execution

- Use `--grep` to run specific test suites
- Implement test parallelization
- Optimize test data and cleanup

#### 2. Large Artifacts

- Upload only on failure
- Compress artifacts before upload
- Set appropriate retention periods

#### 3. Resource Limits

- Use matrix strategy to distribute load
- Implement conditional job execution
- Monitor runner usage patterns

## 📈 Metrics & Analytics

### Test Execution Time

- **Unit tests**: ~2-3 minutes
- **Main CI E2E**: ~10-15 minutes
- **Lite cross-browser**: ~60-70 minutes
- **Comprehensive tests**: ~500+ minutes
- **Visual regression**: ~8-12 minutes

### Success Rates

- **Main CI**: Target >95% success rate
- **Lite tests**: Target >90% success rate
- **Comprehensive**: Target >90% success rate
- **Performance**: Target <5% regression

### Cost Management (Private Repos)

- **Automatic workflows**: ~500-800 min/month (within free tier)
- **Lite tests**: ~$0.54/run (manual)
- **Comprehensive**: ~$4+/run (manual)
- **Budget**: Pay-as-you-go for manual testing only

This workflow setup provides comprehensive testing coverage while maintaining efficiency and developer productivity! 🎯
