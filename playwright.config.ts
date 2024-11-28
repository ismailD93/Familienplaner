import { defineConfig } from "@playwright/test";

const baseURL = "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  retries: 2,
  workers: 1,
  reporter: "list",
  outputDir: "./test-results",
  reportSlowTests: null,
  use: {
    baseURL,
    headless: true,
    trace: "retain-on-failure",
  },
});
