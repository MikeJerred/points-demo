import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Points API Demo');
});

test('stores campaign in localStorage', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('create-campaign-btn').click();

  await expect(page.getByTestId('api-key-ctrl')).toBeVisible();

  await page.waitForFunction(() => JSON.parse(localStorage['campaign']).apiKey);
});
