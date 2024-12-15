
import { test, expect } from '@playwright/test';

test('Search for articles and verify results', async ({ page }) => {
  // Step 1: Navigate to the Wiley Online Library homepage
  await page.goto('https://onlinelibrary.wiley.com', { waitUntil: 'domcontentloaded' });

  // Step 2: Wait for and locate the search input field
  const searchInput = page.locator('#searchField1');
  await expect(searchInput).toBeVisible({ timeout: 10000 }); // Ensure the search input is visible

  // Step 3: Fill in the search item and submit
  await searchInput.fill('Machine Learning');
  await searchInput.press('Enter'); 

  // Step 4: Wait for the search results to load
  const searchResultsContainer = page.locator('#search-result');
  await expect(searchResultsContainer).toBeVisible({ timeout: 10000 }); 

  // Step 5: Locate individual search items within container
  const searchItems = searchResultsContainer.locator('.search__item');
  
  // Corrected assertion to check if there are search results
  const count = await searchItems.count();
  expect(count).toBeGreaterThan(0);

  // Step 6: check for the visibility of the first search result
  const firstSearchItem = searchItems.nth(0);
  await expect(firstSearchItem).toBeVisible(); 
});
