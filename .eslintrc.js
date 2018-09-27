module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  globals: {},
  extends: ['plugin:vue/recommended', 'standard'],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never' // default: always
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'never' // default: always
    }],
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'never', // default: always
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/mustache-interpolation-spacing': ['error', 'never'], // default: always
    'vue/no-v-html': [0], // default: 'error'
  }
};