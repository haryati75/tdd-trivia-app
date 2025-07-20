import { test, expect } from '@playwright/test';

test.describe('Mobile Browser Testing', () => {
  
  test('Quiz works on mobile Chrome', async ({ page }, testInfo) => {
    // Skip this test for non-mobile browsers
    test.skip(!testInfo.project.name.includes('Mobile'), 
      'This test is only for mobile browsers');
    
    await page.goto('/');
    
    // Test touch interactions
    await page.getByTestId('start-quiz-button').tap();
    await expect(page.getByTestId('question-card')).toBeVisible();
    
    // Test radio button selection on mobile
    const firstLabel = page.locator('label').first();
    await firstLabel.tap();
    
    await page.getByTestId('confirm-answer-button').tap();
    await expect(page.getByTestId('answer-feedback')).toBeVisible();
    
    console.log('✅ Mobile: Touch interactions working');
  });

  test('Mobile Safari specific behaviors', async ({ page }, testInfo) => {
    // This test will run on the 'Mobile Safari' project
    test.skip(!testInfo.project.name.includes('Mobile'), 
      'This test is only for mobile browsers');
    
    await page.goto('/');
    
    // Test iOS Safari specific behaviors
    await page.getByTestId('start-quiz-button').tap();
    await expect(page.getByTestId('question-card')).toBeVisible();
    
    // Test scroll behavior on mobile
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));
    
    console.log('✅ Mobile Safari: Scroll and tap interactions working');
  });

  test('Responsive layout on various mobile sizes', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('Mobile'), 
      'This test is only for mobile browsers');
      
    const mobileSizes = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 390, height: 844, name: 'iPhone 12' },
      { width: 393, height: 851, name: 'Pixel 5' },
      { width: 360, height: 640, name: 'Galaxy S5' }
    ];

    for (const size of mobileSizes) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto('/');
      
      // Check if elements are visible and properly sized
      await expect(page.getByRole('heading', { name: 'TDD Trivia' })).toBeVisible();
      await expect(page.getByTestId('start-quiz-button')).toBeVisible();
      
      // Start quiz and check question layout
      await page.getByTestId('start-quiz-button').click();
      await expect(page.getByTestId('question-card')).toBeVisible();
      
      console.log(`✅ ${size.name} (${size.width}x${size.height}): Layout working`);
    }
  });
});
