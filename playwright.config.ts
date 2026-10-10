import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/preview-static.mjs',
    url: 'http://127.0.0.1:4321/es/',
    reuseExistingServer: !process.env.CI,
  },
});
