module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'standard',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'allowEmptyReject': 0,
    'semi': [2, 'always'],
    'no-return-assign': 0,
    'node/no-deprecated-api': 0,
    'no-useless-escape': 0,
    'no-undef': 0,
    'no-unused-expressions': 0,
    'max-len': ["error", { "code": 140 }],
    'no-console': 1,
    'quotes': [2, 'single', { 'allowTemplateLiterals': true }]
  }
};
