// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.{js,ts}'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    {
        files: ['webpack.config.js', 'webpack.dev.config.js', 'webpack.prod.config.js'],
        languageOptions: {
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    }
);
