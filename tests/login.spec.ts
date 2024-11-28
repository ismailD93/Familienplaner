import { test, expect } from "@playwright/test";

test.describe("User Login", () => {
  test("should allow a user to log in", async ({ page }) => {
    await page.goto("https://localhost:3000/login");

    // Fill in the login form
    await page.fill('input[name="username"]', "ismail");
    await page.fill('input[name="password"]', "Asdfasdf1234.");

    // Submit the form
    await page.click('button[type="submit"]');

    // Assert successful login by checking redirected page or message
    await expect(page).toHaveURL("https://localhost:3000/"); // Expected page after login
    // await expect(page.locator("h1")).toContainText("Welcome, Test User"); // Check for specific UI elements
  });
});
