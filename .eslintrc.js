module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'plugin:node/recommended'
    ],
    plugins: [
        'import'
    ],
    env: {
        es6: true,
        node: true,
        jest: true
    },
    globals: {
        assert: true,
        should: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            es6: true
        },
        project: ["./tsconfig.json"]
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './'
            }
        }
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'warn', // TODO: to be removed, after refactoring
        // "@typescript-eslint/camelcase": "warn", // TODO: to be removed, after refactoring
        // "@typescript-eslint/interface-name-prefix": "off",
        // "@typescript-eslint/explicit-function-return-type": "off",
        indent: [
            'error',
            4,
            {
                ignoredNodes: ['TemplateLiteral'],
                SwitchCase: 1
            }
        ],
        'nonblock-statement-body-position': ['error', 'below'],
        'global-require': ['off'],
        'no-plusplus': ['off'],
        'operator-linebreak': [
            'error',
            'after',
            {
                overrides: {
                    '?': 'ignore',
                    ':': 'ignore'
                }
            }
        ],
        'template-curly-spacing': ['off'],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single'],
        'no-confusing-arrow': ['off'],
        'no-console': ['off'],
        curly: ['error', 'multi-or-nest'],
        'array-bracket-spacing': [
            'error',
            'always',
            {
                singleValue: true,
                objectsInArrays: false,
                arraysInArrays: false
            }
        ],
        'newline-before-return': ['error'],
        camelcase: ['off'],
        'no-unused-expressions': 'off',
        'max-len': [
            'warn',
            {
                code: 160,
                ignoreUrls: true
            }
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: ['for', 'while', 'if', 'do', 'switch', 'try', 'throw', 'const', 'let', 'export', 'var']
            },
            {
                blankLine: 'always',
                prev: ['for', 'while', 'if', 'do', 'switch', 'try', 'throw', 'const', 'let', 'export', 'var'],
                next: '*'
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var']
            }
        ],
        'linebreak-style': ['off'],
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ]
            }
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': [
            'error',
            {
                ignore: ['pages/404$']
            }
        ],
        'import/no-unused-modules': [
            1,
            {
                unusedExports: true
            }
        ],
        'import/named': ['error'],
        'node/no-unpublished-require': ['off'],
        'node/no-extraneous-require': [
            'error',
            {
                allowModules: ['firebase']
            }
        ],
        'node/no-unsupported-features/es-syntax': [
            'error',
            {
                ignores: ['modules']
            }
        ],
        'node/no-missing-import': 'off',
        'class-methods-use-this': 'off',
        'no-restricted-syntax': 'off',
        'no-unused-vars': 0,
        'function-paren-newline': ['error', 'consistent'],
        'lines-between-class-members': ['error', {
            enforce: [{
                blankLine: 'never',
                prev: 'field',
                next: 'field'
            }]
        }, {
                exceptAfterSingleLine: true
            }],
        'import/extensions': 'off',
        'array-element-newline': [
            'error', 'consistent'
        ],
        'multiline-ternary': ['error', 'always-multiline'],
        '@typescript-eslint/no-explicit-any': 'warn', // TO-DO: Remove this and fix issues
        'node/no-unpublished-import': ['error', {
            allowModules: ['supertest', 'prom-client', '@nestjs/testing', '@sentry/node']
        }],
        'node/no-extraneous-import': 'off',
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'max-classes-per-file': 'off',
        "import/prefer-default-export": "off"
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': ['warn']
            }
        }
    ]
};
