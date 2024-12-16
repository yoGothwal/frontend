// @ts-check
import { test, expect } from '@playwright/test';
test.describe('Note App', () => {
  // Setup before each test
  test.beforeEach(async ({ page, request }) => {
    // Reset the backend
    test.setTimeout(10_000);
    await request.post('http://localhost:5000/testing/reset');
    const testUser = {
      name: "goty",
      username: "goty",
      password: "1234",
    }
    await request.post('http://localhost:5000/users', { data: testUser });
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('Cancel')).toBeVisible();
    await page.getByTestId('username').fill('goty');
    await page.getByTestId('password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('logged-in')).toBeVisible();
  });

  // Test for adding a note
  test('note can be added', async ({ page }) => {
    await page.getByRole('button', { name: 'new note' }).click();
    await expect(page.getByText('Create a new note')).toBeVisible();
    await page.getByRole('textbox').fill('my note 1');
    await page.getByRole('button', { name: 'save' }).click();
    await expect(page.getByText('Your awesome note: my note 1')).toBeVisible();
  });

  // Test for toggling note importance
  test('note importance can be toggled', async ({ page }) => {
    await page.getByRole('button', { name: 'new note' }).click();
    await expect(page.getByText('Create a new note')).toBeVisible();
    await page.getByRole('textbox').fill('my note 1');
    await page.getByRole('button', { name: 'save' }).click();
    await page.getByRole('button', { name: 'make not important' }).click();
    await expect(page.getByRole('button', { name: 'make important' })).toBeVisible();
  });
});
