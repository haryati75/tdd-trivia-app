# TDD Trivia App 🎯

A modern, interactive trivia application focused on Test-Driven Development (TDD) concepts, built with React, TypeScript, and Vite.

## 🌐 Live Demo

**🎯 [Try the Live App](https://trivia.charityx.io)** - Test your TDD knowledge now!

> 🚀 **Built from Template**: This project was created using the [tdd-react-template](https://github.com/haryati75/tdd-react-template) - a comprehensive React + TypeScript + TDD starter template.

## ✨ Features

### 🎮 Interactive Quiz Experience

- **10 TDD-focused questions** covering concepts, best practices, and tools
- **Difficulty-based scoring** (Easy: 1 point, Medium: 2 points, Hard: 3 points)
- **Performance-based emojis** that update in real-time based on your score
- **Instant feedback** with encouraging messages for correct answers
- **Educational support** - shows correct answers when you get questions wrong

### 🎨 Modern UI/UX

- **Interactive radio button cards** with hover and selection animations
- **Progress tracking** during the quiz (hidden at completion)
- **Performance assessment** with motivational messages at the end
- **Completion timing** to track how long you took
- **Responsive design** that works on all devices
- **Dark/Light theme support** with automatic system preference detection

### 🏗️ Developer Experience

- **SCSS color management system** for maintainable styling
- **Centralized color variables** with automatic theme switching
- **Reusable UI mixins** for consistent interactive elements
- **Type-safe styling** with SCSS variables and mixins

### 🧪 Built with TDD Methodology

- **143 comprehensive tests** across all components
- **Vitest** for fast unit testing
- **React Testing Library** for component testing
- **Playwright** for end-to-end testing
- **100% test coverage** for all features
- **Essential testing strategy** for fast development cycles

> 📚 **[Development & Testing Guide](docs/README.md)** - Complete documentation for developers

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/haryati75/tdd-trivia-app.git
   cd tdd-trivia-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start taking the TDD trivia quiz!

### 🚀 Want to Create Your Own?

This project was built using the [tdd-react-template](https://github.com/haryati75/tdd-react-template). You can use the same template to create your own TDD-focused React projects:

1. **Use the template**

   ```bash
   # Create a new repository from the template
   gh repo create your-project-name --template haryati75/tdd-react-template
   ```

2. **Or clone the template**
   ```bash
   git clone https://github.com/haryati75/tdd-react-template.git your-project-name
   cd your-project-name
   npm install
   ```

## 🛠️ Development

### Available Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Build for production           |
| `npm run preview`       | Preview production build       |
| `npm test`              | Run unit tests (watch mode) ⭐ |
| `npm run test:coverage` | Unit tests with coverage ⭐    |
| `npm run test:e2e`      | Cross-browser E2E tests        |
| `npm run lint`          | Run ESLint                     |

> ⭐ **Essential tests** - recommended for daily development

### 🧪 Testing Strategy

This project uses an **Essential Testing** approach for optimal development speed and reliability:

> 📚 **[Complete Testing Documentation](docs/README.md)** - Comprehensive guide to our testing strategy, development setup, and workflows

#### ✅ Essential Tests (Recommended)

Our daily development workflow focuses on **fast, reliable essential tests**:

- **Unit Tests**: Complete coverage of all components and utilities (143 tests)
- **E2E Tests**: Chromium (most common browser) + Mobile Chrome simulation
- **Execution Time**: ~5-10 seconds for complete essential coverage
- **Reliability**: 100% stable tests with proper mocking and masking

```bash
# Run essential tests (recommended)
npm test                    # Unit tests in watch mode
npm run test:coverage       # Unit tests with coverage
npm run test:essential      # Essential E2E tests (Chromium + Mobile Chrome)

# Essential E2E debugging & UI
npm run test:essential:ui   # Essential E2E with interactive UI ⭐
npm run test:essential:debug # Essential E2E with step-by-step debugging ⭐

# Quick essential validation
npm test run && npm run test:essential
```

#### 🌐 Comprehensive Cross-Browser Testing (Optional)

For thorough cross-browser validation when needed:

```bash
# Manual comprehensive testing workflows
npm run test:e2e            # All browsers (Firefox, WebKit, Edge, Mobile Safari)
npm run test:e2e:ui         # All browsers with interactive UI (comprehensive)
npm run test:e2e:debug      # All browsers with debugging (comprehensive)

# Cross-browser testing script
npm run test:cross-browser  # Interactive script for comprehensive testing

# View detailed test reports
npm run test:e2e:report
```

#### 🎯 Testing Philosophy

- **Essential First**: Fast feedback loops with essential browser coverage (~95% real-world usage)
- **Visual Regression**: Answer feedback area masked to handle random content
- **Mobile Support**: Touch interactions properly configured for mobile testing
- **TDD Approach**: Tests written first, driving implementation design
- **Environment Control**: `PLAYWRIGHT_ESSENTIAL_ONLY=true` skips visual regression for speed

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Interactive button component
│   ├── Card.tsx        # Container card component
│   ├── Footer.tsx      # Footer with developer info
│   ├── RadioButtonGroup.tsx  # Interactive radio options
│   ├── Text.tsx        # Typography component
│   └── *.test.tsx      # Component tests
├── _colors.scss        # 🎨 Centralized color system & mixins
├── App.tsx             # Main application component
├── App.scss            # Application styles using color system
├── index.scss          # Global styles with color variables
├── questions.json      # TDD trivia questions database
└── main.tsx           # Application entry point
```

### 🎯 Key Components

#### **App Component**

- Main quiz logic and state management
- Question navigation and scoring
- Performance tracking and timing
- User interaction handling

#### **RadioButtonGroup Component**

- Interactive answer selection
- Animated hover and selection states
- Accessibility support
- Disabled state handling

#### **Footer Component**

- Developer attribution
- Dynamic copyright year
- GitHub repository link

### 🎨 Styling Architecture

- **SCSS with centralized color system** - All colors managed in one place
- **CSS custom properties** for automatic theme switching (dark/light modes)
- **Reusable mixins** for consistent interactive elements
- **Animation system** for hover and selection effects
- **Responsive design** principles

#### 🌈 Color Management System

This project features a comprehensive color management system that provides:

- **Single source of truth** for all colors in `_colors.scss`
- **Automatic theme switching** based on user's system preference
- **CSS custom properties** (variables) for efficient styling
- **SCSS mixins** for common interactive patterns
- **Easy maintenance** - change colors once, updates everywhere

**📚 [Detailed Color System Documentation](docs/COLOR_SYSTEM.md)** - Learn how to use and extend the color system

## 📊 Test Coverage

The project maintains comprehensive test coverage:

- **Unit Tests**: 143 tests across 12 test files covering all components and logic
- **Integration Tests**: Full user journey testing
- **E2E Tests**: Complete application flow validation
- **Essential Testing**: Covers ~95% of real-world browser usage
- **Accessibility Tests**: Ensuring inclusive design

> 📚 **[Testing Documentation](docs/README.md)** - Complete testing strategy and workflow guide

## 🎓 Learning Objectives

This app teaches TDD concepts including:

- **Red-Green-Refactor cycle**
- **Test-first development approach**
- **Mocking and stubbing techniques**
- **Testing frameworks and tools**
- **Best practices and common pitfalls**

## 🛡️ Technology Stack

- **Frontend**: React 19.1, TypeScript 5.8
- **Build Tool**: Vite 7.0
- **Styling**: SCSS with centralized color management system
- **Testing**: Vitest 3.2, React Testing Library, Playwright
- **Code Quality**: ESLint, TypeScript strict mode

## 📈 Performance Features

- **Real-time score tracking** with performance emojis
- **Completion timing** to measure quiz duration
- **Instant feedback** for immediate learning
- **Progress visualization** during quiz

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Write tests for your changes (TDD approach!)
4. Implement your feature
5. Ensure all tests pass: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Haryati Hassan**

- GitHub: [@haryati75](https://github.com/haryati75)
- Repository: [tdd-trivia-app](https://github.com/haryati75/tdd-trivia-app)
- Template: [tdd-react-template](https://github.com/haryati75/tdd-react-template)

---

## 🎯 Take the Quiz!

Ready to test your TDD knowledge? You have two options:

### 🌐 Play Online (Easiest)

**[🎯 Start Quiz Now](https://haryati75.github.io/tdd-trivia-app/)** - No setup required!

### 💻 Run Locally (For Development)

Start the development server and see how well you know Test-Driven Development concepts!

```bash
npm run dev
```

_Built with ❤️ using Test-Driven Development from the [tdd-react-template](https://github.com/haryati75/tdd-react-template)_
