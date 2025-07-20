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

- **75+ comprehensive tests** across all components
- **Vitest** for fast unit testing
- **React Testing Library** for component testing
- **Playwright** for end-to-end testing
- **100% test coverage** for all features

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
| `npm test`              | Run unit tests in watch mode   |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e`      | Run end-to-end tests           |
| `npm run lint`          | Run ESLint                     |

### 🧪 Testing

#### Unit Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test run

# Generate coverage report
npm run test:coverage
```

#### End-to-End Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npx playwright test --ui

# View test report
npm run test:e2e:report
```

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

- **Unit Tests**: 75+ tests covering all components and logic
- **Integration Tests**: Full user journey testing
- **E2E Tests**: Complete application flow validation
- **Accessibility Tests**: Ensuring inclusive design

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
