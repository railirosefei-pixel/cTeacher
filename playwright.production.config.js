import { defineConfig, devices } from "@playwright/test";

const productionBaseURL = "http://127.0.0.1:5128/cTeacher/";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  outputDir: "test-results/production",
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report/production", open: "never" }],
  ],
  use: {
    baseURL: productionBaseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
  },
  projects: [
    {
      name: "production-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run preview:test",
    url: productionBaseURL,
    reuseExistingServer: false,
    timeout: 120000,
  },
});