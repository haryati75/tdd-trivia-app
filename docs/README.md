# TDD Trivia App Documentation 📚

Welcome to the TDD Trivia App documentation! This guide will help you understand the testing strategy, development workflow, and project structure.

## 🎯 Quick Start

### Essential Testing (Recommended)

```bash
# Unit tests (watch mode during development)
npm test

# Essential E2E tests (before committing)
npm run test:essential

# Essential tests with UI for debugging
npm run test:essential:ui
```

### Development Workflow

```bash
# Start development server
npm run dev

# Run unit tests in watch mode
npm test

# Before committing changes
npm test run && npm run test:essential
```

## 📖 Documentation Index

### Core Documentation

- **[Testing Strategy](./TESTING_STRATEGY.md)** - Complete testing approach and best practices
- **[Development Setup](./DEVELOPMENT_SETUP.md)** - VS Code configuration and package scripts
- **[GitHub Workflows](./GITHUB_WORKFLOWS.md)** - CI/CD pipeline and workflow management

### Advanced Topics

- **[Snapshot Management](./SNAPSHOT_MANAGEMENT.md)** - Visual regression testing and artifact handling
- **[Color System](./COLOR_SYSTEM.md)** - Design system documentation
- **[Architecture & Maintenance](./REFACTORING_SUMMARY.md)** - Code architecture guide and maintenance guidelines

## 🚀 Key Features

- **Essential Testing Strategy**: Fast, reliable tests covering 95% of use cases
- **Optimized CI/CD**: Free-tier friendly GitHub Actions workflows
- **VS Code Integration**: Configured tasks and debugging for optimal DX
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🎯 Testing Philosophy

This project follows an **Essential Testing** approach:

- **Unit Tests**: 100% coverage of business logic
- **E2E Tests**: Chromium + Mobile Chrome (covers 95% real-world usage)
- **On-Demand**: Full cross-browser testing when needed
- **Fast Feedback**: ~5-10 seconds total test execution

For detailed information, see [Testing Strategy](./TESTING_STRATEGY.md).
