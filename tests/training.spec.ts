
import { test, expect } from '@playwright/test';

test('training', async ({ page }) => {
  // Open the main page
  await page.goto('https://onlinelibrary.wiley.com/');
  
  // Wait for the "Training and Support" link and click it
  await page.getByRole('link', { name: 'Training and Support', exact: true }).click();

  // Go to the training hub page
  await page.goto('https://www.wiley.com/en-us/customer-success/wiley-online-library-training-hub?_gl=1*16yj5m4*_gcl_au*MTgxMTA2NTkyNC4xNzM0MjgyNTA0');
  
  const readArticleLink = await page.locator('a[aria-label="Read Article"]').nth(0);
  
  const articleUrl = await readArticleLink.getAttribute('href');
  
  await page.goto('https://www.wiley.com' + articleUrl);

  // Wait for the article content to be visible
  await page.waitForSelector('article'); // Adjust the selector if necessary
  
  // Extract the article's text content
  const articleContent = await page.locator('article').textContent();
  
  // Print the article content (or process it as needed)
  console.log('Article Content:', articleContent);
  
  expect(articleContent).toContain('CONNECT User Guide'); 
});
