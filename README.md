# Learn Test-Driven Development (TDD) with React 🎯

A beginner-friendly React template designed for high school students to learn Test-Driven Development (TDD). This template comes with everything pre-configured so you can focus on learning React and TDD concepts!

> 🔧 **Need technical details?** Check out our [Technical Documentation](README-TECHNICAL.md) for advanced configuration and deployment info.

## What You'll Learn 📚

- 🧪 **Test-Driven Development (TDD)** - Write tests first, then code to make them pass
- ⚛️ **React 19** - Build modern web applications
- 🔍 **TypeScript** - Catch errors before they happen
- 🎭 **End-to-End Testing** - Test your app like a real user would
- 🚀 **Professional Workflow** - Use the same tools that real developers use
- � **Code Coverage** - See how much of your code is tested

## What is Test-Driven Development? 🤔

TDD is a way of writing code where you:

1. **Red** 🔴 - Write a test that fails (because the feature doesn't exist yet)
2. **Green** 🟢 - Write just enough code to make the test pass
3. **Refactor** 🔄 - Clean up your code while keeping tests green

This helps you write better, more reliable code!

## Prerequisites 📋

Before you start, make sure you have:

- **Computer** with Windows, Mac, or Linux
- **Basic HTML/CSS knowledge** (you should know what divs, classes, and styling are)
- **Basic JavaScript knowledge** (variables, functions, if statements)
- **VS Code** installed ([download here](https://code.visualstudio.com/))
- **Node.js** installed ([download here](https://nodejs.org/)) - choose the LTS version

Don't worry if you're not an expert! This template is designed for beginners.

## Getting Started 🚀

### Setting Up Your Project

1. **Get this template**:

   - Click the green **"Use this template"** button at the top of this page
   - Give your project a name (like "my-first-tdd-project")
   - Click **"Create repository"**
   - Then click the green **"Code"** button and copy the URL

   Or download it directly:

   ```bash
   git clone https://github.com/YOUR_USERNAME/your-project-name.git
   cd your-project-name
   ```

2. **Install the project dependencies** (like downloading the tools you need):

   ```bash
   npm install
   ```

   This might take a few minutes - don't worry, this is normal!

3. **Install testing browsers** (one-time setup):

   ```bash
   npx playwright install --with-deps
   ```

4. **Open your project in VS Code**:
   - Open VS Code
   - File → Open Folder → Choose your project folder
   - VS Code might ask to install some extensions - click "Yes" to install them!

### Your First Steps - Let's Run the App! 🎉

#### Using VS Code (Recommended for Beginners)

1. **Start your development server**:

   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Tasks: Run Task"
   - Choose **🚀 Start Dev Server**
   - A browser should open showing your app at `http://localhost:5173`

2. **Start your tests in watch mode** (they'll run automatically when you change code):
   - Press `Ctrl+Shift+P` again
   - Type "Tasks: Run Task"
   - Choose **🧪 Test: Unit (Watch)**
   - You'll see a terminal showing your test results

Now you have your app running AND your tests watching for changes! 🎯

#### Using Command Line (Alternative)

If you prefer typing commands:

- **See your app in the browser**:
  ```bash
  npm run dev
  ```
- **Run tests once**:
  ```bash
  npm test
  ```
- **Run tests and keep watching for changes**:

  ```bash
  npm test -- --watch
  ```

- **See how much of your code is tested**:
  ```bash
  npm run test:coverage
  ```

## Learning TDD with This Template 🎓

### Your Learning Journey

This template has everything set up so you can focus on learning. Here's what each part does:

**🧪 Unit Tests** - Test individual pieces of your code (like testing a single function)
**🎭 E2E Tests** - Test your whole app like a user would (clicking buttons, filling forms)
**� Coverage Reports** - Show you which parts of your code have tests
**� VS Code Integration** - Makes testing super easy with buttons and shortcuts

### Your First TDD Experience

Let's create a simple button component using TDD!

1. **Write a failing test first** (Red 🔴):

Create a new file `src/components/WelcomeButton.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import WelcomeButton from "./WelcomeButton";

describe("WelcomeButton", () => {
  it("shows welcome message when clicked", () => {
    render(<WelcomeButton />);

    // This test will fail because WelcomeButton doesn't exist yet!
    const button = screen.getByText("Click me!");
    expect(button).toBeInTheDocument();
  });
});
```

2. **Run the test and watch it fail** - this is good! It means our test is working.

3. **Write just enough code to make it pass** (Green 🟢):

Create `src/components/WelcomeButton.tsx`:

```typescript
export default function WelcomeButton() {
  return <button>Click me!</button>;
}
```

4. **Watch your test turn green!** ✅

5. **Add more functionality with more tests**:

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WelcomeButton from "./WelcomeButton";

describe("WelcomeButton", () => {
  it("shows welcome message when clicked", async () => {
    const user = userEvent.setup();
    render(<WelcomeButton />);

    const button = screen.getByText("Click me!");
    await user.click(button);

    expect(screen.getByText("Welcome to TDD!")).toBeInTheDocument();
  });
});
```

6. **Make this new test pass by updating your component**:

```typescript
import { useState } from "react";

export default function WelcomeButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button onClick={() => setClicked(true)}>Click me!</button>
      {clicked && <p>Welcome to TDD!</p>}
    </div>
  );
}
```

Congratulations! 🎉 You just did Test-Driven Development!

## Understanding the Tools 🔧

### What's Included (Don't worry, it's all set up for you!)

**Vitest** - Runs your unit tests super fast
**React Testing Library** - Helps you test React components easily
**Playwright** - Tests your app like a real user would
**TypeScript** - Catches mistakes before you run your code
**VS Code Tasks** - Click buttons instead of typing long commands

### Cool VS Code Features You Can Use

#### Quick Tasks (No need to remember commands!)

- Press `Ctrl+Shift+P` → "Tasks: Run Task" and choose:
  - **🚀 Start Dev Server** - See your app in the browser
  - **🧪 Test: Unit (Watch)** - Tests run automatically as you code
  - **📊 View: Coverage Report** - See what you've tested
  - **🎭 Test: E2E (Playwright)** - Test like a real user

#### Debugging (Finding and fixing bugs)

- Press `Ctrl+Shift+D` for debugging tools
- Set breakpoints by clicking next to line numbers
- **🌐 Debug: React App** - Debug your app in the browser
- **🧪 Debug: Unit Tests** - Debug your tests

### Example Tests to Learn From

#### Simple Component Test

```typescript
// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("shows the main heading", () => {
    render(<App />);
    const heading = screen.getByText("Vite + ReactTS + Vitest + Playwright");
    expect(heading).toBeInTheDocument();
  });
});
```

#### User Interaction Test

```typescript
// Testing button clicks
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Counter Button", () => {
  it("increases count when clicked", async () => {
    const user = userEvent.setup();
    render(<CounterButton />);

    const button = screen.getByRole("button", { name: /count is 0/i });
    await user.click(button);

    expect(screen.getByText("count is 1")).toBeInTheDocument();
  });
});
```

## Practice Projects to Try 💡

Once you're comfortable with the basics, try these projects to practice TDD:

### 1. **Todo List App** 📝

Practice with:

- Adding new todos
- Marking todos as complete
- Deleting todos
- Filtering (show all, completed, pending)

### 2. **Simple Calculator** 🧮

Practice with:

- Addition, subtraction, multiplication, division
- Clear button
- Display results
- Handle edge cases (divide by zero)

### 3. **Weather Display** 🌤️

Practice with:

- Displaying current weather
- Search by city
- Show weather icons
- Handle loading states

### 4. **Student Grade Tracker** 📊

Practice with:

- Add subjects and grades
- Calculate GPA
- Show grade distribution
- Filter by subject

Start simple and add features one test at a time!

## Help & Support 🆘

### Common Beginner Issues

**❌ "Tests are failing!"**

- ✅ This is normal! Read the error message carefully
- ✅ Make sure your component exists where the test expects it
- ✅ Check spelling and capitalization

**❌ "I don't see my changes in the browser"**

- ✅ Make sure the dev server is running (`🚀 Start Dev Server`)
- ✅ Check for error messages in the browser console (F12)
- ✅ Try refreshing the page

**❌ "VS Code looks different from the examples"**

- ✅ Install the recommended extensions (VS Code will ask you)
- ✅ Try reloading VS Code (`Ctrl+Shift+P` → "Reload Window")

**❌ "I'm confused about TDD"**

- ✅ Remember: Red (failing test) → Green (make it pass) → Refactor (clean up)
- ✅ Start with very simple tests
- ✅ It's okay to feel overwhelmed at first!

### Getting Help

- 💬 Ask your teacher or classmates
- 📖 Read error messages carefully - they usually tell you what's wrong
- 🔍 Google the error message (this is what professional developers do!)
- 📺 Watch YouTube tutorials on React Testing Library
- 📚 Check out the [React Testing Library docs](https://testing-library.com/docs/react-testing-library/intro/)

### Learning Resources

- [React Official Tutorial](https://react.dev/learn)
- [JavaScript.info](https://javascript.info/) - Great for JavaScript basics
- [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Test-Driven Development Explained](https://www.youtube.com/results?search_query=tdd+explained+beginners)

## Advanced Features (For When You're Ready) 🚀

Don't worry about these right away - focus on learning TDD first!

> 📖 **Want all the technical details?** See our [Technical Documentation](README-TECHNICAL.md) for complete setup instructions, CI/CD configuration, and advanced workflows.

### Sharing Your Project Online

This template can automatically put your project on the internet using GitHub Pages:

1. **Push your code to GitHub** (your teacher can help with this)
2. **Go to Settings → Pages** in your GitHub repository
3. **Select "GitHub Actions"** as the source
4. **Your app will be live** at `https://YOUR_USERNAME.github.io/YOUR_PROJECT_NAME/`

### Project Structure (What all these folders do)

```
your-project/
├── src/                    # Your React code goes here
│   ├── components/         # Reusable components (buttons, etc.)
│   ├── App.tsx            # Main app component
│   ├── App.test.tsx       # Tests for the main app
│   └── main.tsx           # Starting point for your app
├── e2e/                   # End-to-end tests (test the whole app)
├── coverage/              # Reports showing what you've tested
├── .vscode/               # VS Code settings (makes coding easier)
└── package.json           # List of tools your project uses
```

### More Commands (When You Need Them)

```bash
npm run build          # Package your app for sharing
npm run lint           # Check your code style
npm run preview        # Preview your built app
npm run test:e2e       # Test your app like a user
```

## Ready to Start Learning? 🎯

### Your Quick Start Checklist

- [ ] ✅ Install VS Code and Node.js
- [ ] 📥 Get this template (click "Use this template")
- [ ] 📦 Run `npm install` in your project folder
- [ ] 🎭 Run `npx playwright install --with-deps`
- [ ] 🚀 Open project in VS Code and start dev server
- [ ] 🧪 Start tests in watch mode
- [ ] 📝 Try the WelcomeButton example above
- [ ] 🎉 Celebrate your first TDD experience!

### Remember: Learning TDD Takes Time

- 🐌 **Start slow** - It's normal to feel confused at first
- 🔄 **Practice the cycle** - Red → Green → Refactor
- 🤝 **Ask for help** - Teachers, classmates, and Google are your friends
- 🎯 **Focus on simple tests first** - Complex stuff comes later
- 🏆 **Celebrate small wins** - Every passing test is progress!

**Good luck on your TDD journey!** 🚀 You're learning skills that professional developers use every day.

---

## More Resources

- 📖 **[Technical Documentation](README-TECHNICAL.md)** - Complete setup guide, CI/CD, and advanced features
- 🎯 **[React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)**
- 🧪 **[Vitest Documentation](https://vitest.dev/)**
- 🎭 **[Playwright Documentation](https://playwright.dev/)**
