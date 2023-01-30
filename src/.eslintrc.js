module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommenended',
    'google',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module'
  },
  ignorePatterns: [
    '/lib/**/*' // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import', 'testing-library', 'jest-dom'],
  rules: {
    quotes: ['error', 'double'],
    'import/no-unresolved': 0
  }
};
