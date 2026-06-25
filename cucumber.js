module.exports = {
  default: {
    require: ['features/step_definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 2,
    retry: 1,
    retryTagFilter: '@flaky'
  }
};
