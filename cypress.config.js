const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 1200000,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: false,
  blockHosts: 'https://panorama.wixapps.net/api/v1/bulklog',
  // reporter: 'cypress-mochawesome-reporter',
  retries: {
      runMode: 3,
      openMode: 0,
  },
  numTestsKeptInMemory: 5,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
