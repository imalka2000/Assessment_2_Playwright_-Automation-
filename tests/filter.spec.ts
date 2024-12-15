
import { test, expect } from '@playwright/test';

test('Search for articles in a specific journal and verify results', async ({ page }) => {
  // Step 1: Navigate to the Wilesy Online Library homepage
  await page.goto('https://onlinelibrary.wiley.com', { waitUntil: 'domcontentloaded' });

  // Step 2: Locate the search input field
  const searchInput = page.locator('#searchField1');
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Step 3: Fill in the search term "Machine Learning" and submit
  await searchInput.fill('Machine Learning');
  await searchInput.press('Enter');

  // Step 4: Wait for the results page to load
  const searchResultsContainer = page.locator('.search-results-page-body .page-body');
  await searchResultsContainer.waitFor({ state: 'visible', timeout: 60000 });

  // Step 5
  const srOnlyElement = page.locator('.sr-only', { hasText: 'Search Results' });
  await expect(srOnlyElement).toContainText('Search Results');

  // Step 6: Apply the filter for the journal "Mathematical Problems in Engineering"
  const journalFilter = page.locator('text=Mathematical Problems in Engineering').first();
  await journalFilter.waitFor({ state: 'visible', timeout: 10000 });
  await journalFilter.click();

  // Step 7: Wait for the applied filters list to be visible 
  const appliedFilters = page.locator('.filters-applied-list');
  await appliedFilters.waitFor({ state: 'visible', timeout: 10000 }); 
  await expect(appliedFilters).toContainText('Mathematical Problems in Engineering'); 

  // Step 8: Check that search results are displayed
  const searchResultsCount = page.locator('.result__count');
  const resultCountText = await searchResultsCount.textContent();
  const resultCount = parseInt(resultCountText?.replace(/,/g, '') || '0', 10);
  expect(resultCount).toBeGreaterThan(0);

  // Step 9: Wait for the first result explicitly to load
  const firstResult = page.locator('.search-result-item a').first();
  await firstResult.waitFor({ state: 'visible', timeout: 20000 });

  // Step 10: Verify the first search result is visible
  await expect(firstResult).toBeVisible();

  //Click on the first result and verify navigation
  await firstResult.click();
  await expect(page).toHaveURL(/.*\/doi\/.*|.*\/article\/.*/);

  await expect(page).toHaveTitle(/Machine Learning/);
});