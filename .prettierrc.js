module.exports = {
  printWidth: 180,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  overrides: [
    {
      files: "*.html",
      options: {
        parser:"html"
      }
    },
    {
      files: "*.vue",
      options: {
        parser:"vue"
      }
    },
    {
      files: "*.json",
      options: {
        printWidth: 300,
      }
    }
  ]
};
