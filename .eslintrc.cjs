module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        "vitest-globals/env": true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:vitest-globals/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: '18.2',
        },
    },
    plugins: ['react'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],

    rules: {
        indent: ['error', 2],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        eqeqeq: 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'no-console': 0,
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 0,
    },
}
