# Development Setup Guide 🛠️

This guide covers VS Code configuration, package scripts, and local development setup for optimal developer experience.

## 🎯 VS Code Configuration

### Essential Testing Tasks (Default)

The VS Code tasks are optimized for the essential testing workflow:

| Task                                   | Purpose                    | Scope                           | Duration |
| -------------------------------------- | -------------------------- | ------------------------------- | -------- |
| **🎯 Test: Essential (Unit + E2E)** ⭐ | Complete essential testing | Unit + Chromium + Mobile Chrome | ~10s     |
| **🎯 Test: Essential E2E**             | E2E tests only             | Chromium + Mobile Chrome        | ~5s      |
| **📊 Test: Essential with Reports**    | With coverage reports      | Unit + E2E + Coverage           | ~15s     |

### Unit Testing Tasks

- **🧪 Test: Unit (Watch)** - Development mode with auto-rerun
- **🧪 Test: Unit (Run Once)** - Single execution for validation
- **📊 Test: Unit with Coverage** - Generates coverage reports

### Development Tasks

- **🚀 Start Dev Server** - Vite development server (http://localhost:5173)
- **🔨 Build Production** - Production build validation

### Comprehensive Testing (Optional)

- **🎭 Test: E2E (All Browsers)** - Firefox, WebKit, Edge, Mobile Safari
- **🌐 Test: Comprehensive** - Complete browser matrix testing

## 📦 Package Scripts

### Essential Testing Scripts (Primary)

```bash
# Core essential commands
npm run test:essential        # Chromium + Mobile Chrome (headless)
npm run test:essential:ui     # Interactive UI for debugging
npm run test:essential:debug  # Step-by-step debugging

# Unit testing
npm test                      # Watch mode (development)
npm test run                  # Single run (CI/validation)
npm run test:coverage         # With coverage reports
```

### Comprehensive Testing Scripts (Secondary)

```bash
# Full cross-browser testing
npm run test:e2e             # All browsers
npm run test:e2e:ui          # Interactive UI
npm run test:e2e:debug       # Step-by-step debugging

# Specific browsers
npm run test:e2e:chrome      # Chromium only
npm run test:e2e:firefox     # Firefox only
npm run test:e2e:safari      # WebKit only
npm run test:e2e:mobile      # Mobile Chrome + Safari

# Shell scripts
npm run test:cross-browser   # Cross-browser testing script
npm run test:cleanup         # Clean test artifacts
```

### Development Scripts

```bash
# Development
npm run dev                  # Start development server
npm run build                # Production build
npm run preview              # Preview production build

# Testing utilities
npm run test:e2e:report      # View test reports
```

## 🎯 Essential Testing Environment Variables

The essential testing strategy uses environment variables to optimize test execution:

````bash
## 🎯 Essential Testing Integration

This project uses an **Essential Testing** strategy. For complete strategy details, see [Testing Strategy](./TESTING_STRATEGY.md).

### Environment Variables

Essential testing uses environment variables for optimization:

```bash
# Automatically set by package.json scripts
PLAYWRIGHT_ESSENTIAL_ONLY=true  # Skips visual regression tests
````

**Effects**:

- ✅ **Fast execution** (~5 seconds vs ~2 minutes)
- ✅ **Reliable results** (no baseline image dependencies)
- ✅ **95% coverage** with essential browsers only

````

This ensures:

- ✅ **Fast execution** (~5 seconds vs ~2 minutes)
- ✅ **Reliable results** (no baseline image dependencies)
- ✅ **95% coverage** with essential browsers only

## 🚀 Development Workflow

### 1. Daily Development

```bash
# Start development server
npm run dev

# Run unit tests in watch mode (separate terminal)
npm test

# Make your changes...
````

### 2. Before Committing

```bash
# Run unit tests once
npm test run

# Run essential E2E tests
npm run test:essential

# If all pass, commit your changes
```

### 3. Debugging Tests

```bash
# Interactive UI for E2E tests
npm run test:essential:ui

# Step-by-step debugging
npm run test:essential:debug

# View test reports
npm run test:e2e:report
```

### 4. Pre-Release Testing (Optional)

```bash
# Run comprehensive cross-browser tests
npm run test:cross-browser

# Or run specific browser combinations
npm run test:e2e:firefox
npm run test:e2e:mobile
```

## 🛠️ VS Code Extensions (Recommended)

- **Playwright Test for VSCode** - Test discovery and debugging
- **Vitest** - Unit test integration
- **ES7+ React/Redux/React-Native snippets** - React development
- **Prettier** - Code formatting
- **ESLint** - Code linting

## 🎯 Task Shortcuts

Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and type:

- `Tasks: Run Task` → Select any configured task
- `Test: Run Essential` → Quick access to essential testing
- `Debug: Start Debugging` → Launch debugging configurations

## 📊 Performance Benchmarks

| Test Suite        | Browsers                 | Duration | Coverage             |
| ----------------- | ------------------------ | -------- | -------------------- |
| **Essential**     | Chromium + Mobile Chrome | ~5s      | 95% real-world usage |
| **Comprehensive** | All 6 browsers           | ~2min    | 100% browser matrix  |
| **Unit Tests**    | N/A                      | ~3s      | 100% code coverage   |

The essential testing strategy provides the optimal balance of speed, reliability, and coverage for daily development.
