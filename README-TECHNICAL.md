# TDD React Template - Technical Documentation

A complete React TypeScript template with comprehensive testing setup and automated deployment to GitHub Pages.

> 📚 **New to TDD or React?** Check out our [Beginner-Friendly Guide](README.md) first!

## Features

- ⚛️ **React 19** with TypeScript
- 🧪 **Vitest** for unit testing with coverage reports
- 🎭 **Playwright** for end-to-end testing
- 🚀 **GitHub Actions** CI/CD pipeline
- 📦 **Automated deployment** to GitHub Pages
- 🎯 **Test-driven development** ready
- 🛠️ **VS Code integration** with debugging and task automation
- 📊 **Interactive reports** for coverage and E2E tests

## Quick Start

### Using This Template

1. **Create a new repository from this template**:

   - Click "Use this template" button on GitHub
   - Or clone this repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/tdd-react-template.git my-new-project
   cd my-new-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install Playwright browsers** (first time only):

   ```bash
   npx playwright install --with-deps
   ```

4. **Update project configuration**:
   - Update `package.json` with your project name and details
   - Update the `base` path in `vite.config.ts` to match your repository name (currently set to `/tdd-react-template/`):
   ```typescript
   export default defineConfig({
     base: "/your-repo-name/", // Replace with your actual repo name
     // ... rest of config
   });
   ```

### Running the Project

#### Command Line

- **Development server**:

  ```bash
  npm run dev
  ```

- **Unit tests**:

  ```bash
  npm test
  ```

- **Unit tests with coverage**:

  ```bash
  npm run test:coverage
  ```

- **End-to-end tests**:

  ```bash
  npm run test:e2e
  ```

- **View Playwright test report**:

  ```bash
  npm run test:e2e:report
  ```

- **Build for production**:

  ```bash
  npm run build
  ```

- **Lint code**:

  ```bash
  npm run lint
  ```

- **Preview production build**:
  ```bash
  npm run preview
  ```

#### VS Code Integration

This template includes comprehensive VS Code configuration for an enhanced development experience:

**Quick Start:**

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` → "Tasks: Run Task"
3. Choose from organized tasks with visual icons

**Available Tasks:**

- **🚀 Start Dev Server** - Launch React development server
- **🔨 Build Production** - Build for production deployment
- **🧪 Test: Unit (Watch)** - Run tests in watch mode (great for TDD)
- **🧪 Test: Unit (Run Once)** - Run unit tests once and exit
- **📊 Test: Unit with Coverage** - Generate and view coverage reports
- **🎭 Test: E2E (Playwright)** - Run end-to-end tests
- **🎭 Test: E2E with UI** - Run E2E tests with Playwright UI
- **📊 View: Coverage Report** - Generate and open coverage reports
- **📊 View: Coverage Report (Quick)** - Open existing coverage reports
- **🎭 View: Playwright Report** - View E2E test reports with traces
- **🧪 Test: All (Unit + E2E)** - Run complete test suite
- **📊 Test: All with Reports** - Run everything and generate all reports

**Debugging:**

- Press `Ctrl+Shift+D` to access Run and Debug
- **🌐 Debug: React App (Chrome)** - Debug your React app with breakpoints
- **🧪 Debug: Unit Tests** - Debug test files with breakpoints
- **🧪 Debug: Current Test File** - Debug the currently open test file

## Testing Stack

### Unit Testing (Vitest + React Testing Library)

- **Vitest**: Fast unit test runner with hot reload
- **React Testing Library**: Testing utilities for React components
- **Istanbul**: Code coverage reporting
- **jsdom**: Browser environment simulation
- **Testing Location**: Test files are co-located with source files using `.test.tsx` extension

### E2E Testing (Playwright)

- **Playwright**: Cross-browser end-to-end testing
- **Multi-browser support**: Chrome, Firefox, Safari (WebKit)
- **Automatic screenshots and traces on failure**
- **Test Location**: All E2E tests are in the `e2e/` directory

### Example Unit Test

```typescript
// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App renders", () => {
  it("the main heading", () => {
    render(<App />);
    const heading = screen.getByText("Vite + ReactTS + Vitest + Playwright");
    expect(heading).toBeInTheDocument();
  });
});
```

### Example E2E Test

```typescript
// e2e/my-app.spec.ts
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React TDD Template/);
});
```

## CI/CD Pipeline

This template includes a complete GitHub Actions workflow with optimized triggers:

### 1. Automated Testing (`all-tests.yml`)

Runs on every push and pull request to `main` branch, but **skips** when only these files change:

- Documentation files (`*.md`)
- VS Code configuration (`.vscode/`)
- Generated reports (`coverage/`, `playwright-report/`, `test-results/`)
- Configuration files (`.gitignore`, `LICENSE`)

**Features:**

- Unit tests with coverage
- End-to-end tests across multiple browsers (Chrome, Firefox, WebKit)
- Test artifact uploads
- Smart caching for dependencies and Playwright browsers

### 2. Automated Deployment (`deploy.yml`)

Deploys to GitHub Pages when:

- Tests pass successfully
- Changes are pushed to `main` branch
- Manual deployment trigger (workflow_dispatch) for emergency deployments

**Features:**

- Automatic deployment after successful tests
- Manual deployment option with reason tracking
- Dependency caching for faster builds

## Setting Up GitHub Pages Deployment

### 1. Repository Settings

1. Go to your repository **Settings** → **Pages**
2. Set source to **GitHub Actions** (recommended)
   - OR set source to **Deploy from a branch** and select **gh-pages** (after first deployment)
3. Click **Save**

### 2. Actions Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### 3. Update Base Path

Update `vite.config.ts` with your repository name:

```typescript
export default defineConfig({
  base: "/your-repo-name/", // Important: Use your actual repository name
  // ... rest of config
});
```

### 4. Deploy

Push to the `main` branch and the workflow will:

1. Run all tests
2. Build the project
3. Deploy to GitHub Pages
4. Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 5. Manual Deployment (Optional)

You can also trigger deployments manually for emergencies or testing:

1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. In the left sidebar, click **"Deploy to GitHub Pages"**
4. Click the **"Run workflow"** button (top right)
5. Select the branch (usually `main`)
6. Optionally, add a reason for the deployment (e.g., "Emergency hotfix", "Manual testing")
7. Click **"Run workflow"** to start the deployment

This manual trigger is useful for:

- Emergency deployments that bypass normal CI/CD
- Testing the deployment process
- Deploying hotfixes quickly
- Recovering from failed automatic deployments

## Project Structure

```
your-project/
├── .github/workflows/
│   ├── all-tests.yml          # Test workflow
│   └── deploy.yml             # Deployment workflow
├── .vscode/                   # VS Code configuration
│   ├── launch.json            # Debug configurations
│   ├── tasks.json             # Task automation
│   ├── settings.json          # Workspace settings
│   └── extensions.json        # Recommended extensions
├── src/
│   ├── components/            # React components
│   ├── App.test.tsx           # Unit tests
│   ├── setupTests.ts          # Test configuration
│   └── main.tsx
├── e2e/                       # End-to-end tests
├── coverage/                  # Coverage reports (generated)
├── playwright-report/         # E2E test reports (generated)
├── vite.config.ts             # Vite configuration
├── playwright.config.ts       # Playwright configuration
└── package.json
```

## Configuration Files

### Vite Configuration (`vite.config.ts`)

**Current configuration** (update the base path for your repo):

```typescript
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/", // Update this!
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx"],
    },
  },
});
```

### TypeScript Configuration

The project includes proper TypeScript configuration with Vitest globals. The `tsconfig.app.json` already includes:

```json
{
  "include": ["src", "node_modules/vitest/globals.d.ts"]
}
```

**Note**: No additional configuration needed - Vitest globals are already configured!

## Development Workflow

### Recommended TDD Workflow in VS Code

1. **Start Development Environment**:

   - `Ctrl+Shift+P` → "Tasks: Run Task" → **🚀 Start Dev Server**
   - `Ctrl+Shift+P` → "Tasks: Run Task" → **🧪 Test: Unit (Watch)**

2. **Test-Driven Development Cycle**:

   - **Write a failing test** for your new feature
   - **Watch the test fail** (red) in the watch mode terminal
   - **Implement the feature** to make the test pass (green)
   - **Refactor** code while keeping tests green
   - **Debug if needed** using `Ctrl+Shift+D` → **🧪 Debug: Current Test File**

3. **Check Coverage**:

   - `Ctrl+Shift+P` → "Tasks: Run Task" → **📊 View: Coverage Report**
   - Interactive HTML report opens in your browser

4. **Run E2E Tests**:

   - `Ctrl+Shift+P` → "Tasks: Run Task" → **🎭 Test: E2E (Playwright)**
   - View results: **🎭 View: Playwright Report**

5. **Complete Testing**:

   - `Ctrl+Shift+P` → "Tasks: Run Task" → **📊 Test: All with Reports**
   - Runs everything and opens all reports

6. **Commit and Deploy**:
   - **Commit and push** to trigger CI/CD
   - **Review** GitHub Actions results and live deployment

### VS Code Features

#### Integrated Testing

- **Watch Mode**: Tests run automatically as you code
- **Debugging**: Set breakpoints in both source and test files
- **Coverage Visualization**: See exactly which lines need testing
- **E2E Traces**: Visual replay of test failures

#### Smart Development

- **Auto-imports**: Automatic import suggestions
- **TypeScript Integration**: Real-time type checking
- **ESLint**: Code quality and formatting
- **Hot Reload**: Instant preview of changes

## Viewing Reports

### VS Code Integration

- **Coverage Reports**:
  - Use task **📊 View: Coverage Report** to generate and open
  - Or **📊 View: Coverage Report (Quick)** for existing reports
  - Interactive HTML coverage report opens in browser
- **Playwright Reports**:
  - Use task **🎭 View: Playwright Report**
  - View detailed test results, screenshots, and failure traces
  - Interactive timeline and step-by-step debugging

### Manual Access

- **Coverage Report**: Open `coverage/index.html` after running `npm run test:coverage`
- **Playwright Report**: Open `playwright-report/index.html` after running E2E tests
- **GitHub Actions**: Check the Actions tab in your repository for CI results

### Report Features

- **Coverage**: Line-by-line coverage highlighting, branch coverage, function coverage
- **E2E Reports**: Screenshots on failure, video recordings, network logs, step traces

## Troubleshooting

### Common Issues

1. **Deployment fails**: Check the base path in `vite.config.ts` matches your repo name
2. **Tests fail in CI**: Ensure all dependencies are in `package.json`
3. **GitHub Pages not working**: Verify repository settings and workflow permissions
4. **VS Code tasks not working**: Ensure you have the recommended extensions installed
5. **Coverage report not opening**: Run tests with coverage first, then view report
6. **Debugging not working**: Make sure dev server is running before debugging React app

### VS Code Setup Issues

- **Missing extensions**: VS Code will prompt to install recommended extensions
- **Tasks not visible**: Reload window (`Ctrl+Shift+P` → "Reload Window")
- **Debug configurations not working**: Check that file paths in `launch.json` are correct
- **Port conflicts**: Default ports are 5173 (dev), 8080 (coverage), 8081 (alt coverage)

### CI/CD Issues

- **Workflow not triggering**: Check path filters in `.github/workflows/all-tests.yml`
- **Deployment fails**: Verify GitHub Pages settings and repository permissions
- **Manual deployment**: Use workflow_dispatch trigger in Actions tab

### Getting Help

- Check the **Actions** tab for detailed error logs
- Review the **Issues** section of this template repository
- Ensure your repository has the correct permissions set up
- Use VS Code's integrated terminal to see detailed error messages

---

## Dependencies

This template includes all necessary dependencies:

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Vitest** + **React Testing Library** for unit testing
- **Playwright** for E2E testing
- **Istanbul** for coverage reporting
- **http-server** for serving reports locally

### VS Code Extensions (Auto-recommended)

- **TypeScript** - Enhanced TypeScript support
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Playwright** - E2E testing support
- **Vitest Explorer** - Visual test running and debugging
- **Test Explorer** - Additional test management
- **Vite** - Enhanced Vite development experience
- **React Snippets** - Helpful React code snippets
- **Tailwind CSS** - CSS framework support (if using Tailwind)

## Performance Optimizations

### Workflow Optimizations

- **Path filters**: Tests only run when relevant files change
- **Browser caching**: Playwright browsers are cached across runs
- **Dependency caching**: Node modules cached for faster installs
- **Parallel execution**: Tests run in parallel for faster feedback

### Development Optimizations

- **Hot reload**: Instant feedback during development
- **Test watch mode**: Automatic test re-runs on file changes
- **Source maps**: Precise debugging information
- **TypeScript incremental builds**: Faster compilation

You're ready to start building with test-driven development! 🚀

---

> 📚 **Learning TDD?** Don't forget to check out our [Beginner-Friendly Guide](README.md) for step-by-step tutorials and examples!
