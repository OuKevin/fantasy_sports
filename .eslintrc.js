module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'import/no-extraneous-dependencies': ['error', { bundledDependencies: false }],
    semi: [2, 'always'],
    'linebreak-style': 0,
  },
};
