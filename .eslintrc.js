module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['@nuxtjs', 'plugin:prettier/recommended', 'eslint:recommended'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    $nuxt: true
  },
  // parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false
  }
};
