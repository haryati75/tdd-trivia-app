import { test, expect } from '@playwright/test';

// Test the complete quiz flow across all browsers
test.describe('TDD Trivia App - Cross Browser E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to fully load
    await expect(page.getByRole('heading', { name: 'TDD Trivia' })).toBeVisible();
  });

  test('Complete quiz flow works across all browsers', async ({ page, browserName }) => {
    console.log(`Running on ${browserName}`);
    
    // Initial state
    await expect(page.getByTestId('start-quiz-button')).toBeVisible();
    await expect(page.getByTestId('question-card')).not.toBeVisible();
    
    // Start quiz
    await page.getByTestId('start-quiz-button').click();
    
    // Verify question card appears
    await expect(page.getByTestId('question-card')).toBeVisible();
    await expect(page.getByTestId('score-display')).toBeVisible();
    await expect(page.getByTestId('instruction-text')).toBeVisible();
    
    // Answer first question
    const firstLabel = page.locator('label').first();
    await firstLabel.click();
    
    // Confirm answer
    await expect(page.getByTestId('confirm-answer-button')).toBeVisible();
    await page.getByTestId('confirm-answer-button').click();
    
    // Verify feedback appears
    await expect(page.getByTestId('answer-feedback')).toBeVisible();
    
    // Navigate to next question
    await expect(page.getByTestId('next-question-button')).toBeEnabled();
    await page.getByTestId('next-question-button').click();
    
    // Verify we're on question 2
    await expect(page.getByTestId('question-text')).toContainText('Question 2');
    
    console.log(`✅ ${browserName}: Basic quiz flow working`);
  });

  test('Score tracking works consistently across browsers', async ({ page, browserName }) => {
    console.log(`Testing score tracking on ${browserName}`);
    
    await page.getByTestId('start-quiz-button').click();
    
    // Check initial score
    await expect(page.getByTestId('score-display')).toContainText('Score: 0/');
    
    // Answer first question correctly (we know the correct answer from our data)
    const correctAnswerLabel = page.locator('label:has-text("Red = Test fails, Green = Test passes, Refactor = Improve the code")');
    await correctAnswerLabel.click();
    await page.getByTestId('confirm-answer-button').click();
    
    // Check score updated
    await expect(page.getByTestId('score-display')).toContainText('Score: 1/');
    
    console.log(`✅ ${browserName}: Score tracking working`);
  });

  test('Quiz completion flow works in all browsers', async ({ page, browserName }) => {
    console.log(`Testing quiz completion on ${browserName}`);
    
    await page.getByTestId('start-quiz-button').click();
    
    // Complete entire quiz quickly
    for (let i = 1; i <= 10; i++) {
      // Select first option for each question
      const firstLabel = page.locator('label').first();
      await firstLabel.click();
      
      await page.getByTestId('confirm-answer-button').click();
      
      if (i === 10) {
        // Last question - should show "End of Quiz"
        await expect(page.getByTestId('next-question-button')).toContainText('End of Quiz');
        await page.getByTestId('next-question-button').click();
      } else {
        // Continue to next question
        await page.getByTestId('next-question-button').click();
        await expect(page.getByTestId('question-text')).toContainText(`Question ${i + 1}`);
      }
    }
    
    // Verify completion screen
    await expect(page.getByTestId('final-assessment')).toBeVisible();
    await expect(page.getByTestId('completion-time')).toBeVisible();
    await expect(page.getByTestId('back-to-start-button')).toBeVisible();
    
    // Return to start
    await page.getByTestId('back-to-start-button').click();
    await expect(page.getByTestId('start-quiz-button')).toBeVisible();
    
    console.log(`✅ ${browserName}: Quiz completion flow working`);
  });

  test('Responsive design works across browsers and viewports', async ({ page, browserName }) => {
    console.log(`Testing responsive design on ${browserName}`);
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'TDD Trivia' })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'TDD Trivia' })).toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'TDD Trivia' })).toBeVisible();
    
    // Start quiz on mobile
    await page.getByTestId('start-quiz-button').click();
    await expect(page.getByTestId('question-card')).toBeVisible();
    
    console.log(`✅ ${browserName}: Responsive design working`);
  });

  test('Keyboard navigation works across browsers', async ({ page, browserName }) => {
    console.log(`Testing keyboard navigation on ${browserName}`);
    
    // Tab to start button
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('start-quiz-button')).toBeFocused();
    
    // Press Enter to start
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('question-card')).toBeVisible();
    
    // Navigate through radio buttons with arrow keys
    const firstLabel = page.locator('label').first();
    await firstLabel.click();
    
    // Use keyboard to select and confirm
    await page.keyboard.press('Tab'); // Tab to confirm button
    await page.keyboard.press('Enter'); // Confirm answer
    
    await expect(page.getByTestId('answer-feedback')).toBeVisible();
    
    console.log(`✅ ${browserName}: Keyboard navigation working`);
  });

  test('Error handling works consistently across browsers', async ({ page, browserName }) => {
    console.log(`Testing error handling on ${browserName}`);
    
    await page.getByTestId('start-quiz-button').click();
    
    // Try to click Next without selecting an answer
    const nextButton = page.getByTestId('next-question-button');
    await expect(nextButton).toBeDisabled();
    
    // Select an answer but don't confirm
    const firstLabel = page.locator('label').first();
    await firstLabel.click();
    await expect(nextButton).toBeDisabled(); // Should still be disabled
    
    // Confirm answer
    await page.getByTestId('confirm-answer-button').click();
    await expect(nextButton).toBeEnabled(); // Now should be enabled
    
    console.log(`✅ ${browserName}: Error handling working`);
  });

  test('Performance is acceptable across all browsers', async ({ page, browserName }) => {
    console.log(`Testing performance on ${browserName}`);
    
    const startTime = Date.now();
    
    // Navigate through first few questions quickly
    await page.getByTestId('start-quiz-button').click();
    
    for (let i = 0; i < 3; i++) {
      await page.locator('label').first().click();
      await page.getByTestId('confirm-answer-button').click();
      
      if (i < 2) {
        await page.getByTestId('next-question-button').click();
      }
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Performance should be reasonable (less than 5 seconds for 3 questions)
    expect(duration).toBeLessThan(5000);
    
    console.log(`✅ ${browserName}: Performance test completed in ${duration}ms`);
  });
});

// Browser-specific tests
test.describe('Browser-Specific Features', () => {
  
  test('Chrome-specific features', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium');
    
    await page.goto('/');
    
    // Test Chrome DevTools Console (if needed)
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));
    
    await page.getByTestId('start-quiz-button').click();
    
    // Check for any console errors
    const errors = logs.filter(log => log.includes('Error') || log.includes('error'));
    expect(errors).toHaveLength(0);
    
    console.log('✅ Chrome: No console errors found');
  });

  test('Firefox-specific features', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox');
    
    await page.goto('/');
    
    // Firefox might handle focus differently
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('start-quiz-button')).toBeFocused();
    
    console.log('✅ Firefox: Focus handling working');
  });

  test('Safari/WebKit-specific features', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit');
    
    await page.goto('/');
    
    // WebKit might handle radio buttons differently
    await page.getByTestId('start-quiz-button').click();
    
    const labels = page.locator('label');
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);
    
    console.log('✅ Safari/WebKit: Radio button rendering working');
  });
});

// Visual regression tests (comprehensive testing only)
test.describe('Visual Regression Tests', () => {
  
  test('App looks consistent across browsers', async ({ page, browserName }) => {
    // Skip visual regression tests in essential testing (CI/local fast runs)
    test.skip(process.env.PLAYWRIGHT_ESSENTIAL_ONLY === 'true', 'Visual regression tests disabled for essential testing');
    
    await page.goto('/');
    
    // Take screenshot of initial state
    await expect(page).toHaveScreenshot(`initial-state-${browserName}.png`);
    
    // Start quiz and take screenshot
    await page.getByTestId('start-quiz-button').click();
    await expect(page).toHaveScreenshot(`quiz-started-${browserName}.png`);
    
    // Select answer and take screenshot
    await page.locator('label').first().click();
    await page.getByTestId('confirm-answer-button').click();
    
    // Mask the answer feedback area since it contains random emoji/messages
    await expect(page).toHaveScreenshot(`answer-confirmed-${browserName}.png`, {
      mask: [page.getByTestId('answer-feedback')]
    });
    
    console.log(`✅ ${browserName}: Visual regression tests completed`);
  });
});
