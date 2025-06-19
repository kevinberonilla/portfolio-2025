import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: { perfectionist },
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'no-restricted-imports': [
				'warn',
				{
					patterns: [
						{
							group: ['./', '../'],
						},
					],
				},
			],
			'perfectionist/sort-enums': ['warn', { type: 'alphabetical' }],
			'perfectionist/sort-imports': [
				'warn',
				{
					newlinesBetween: 'never',
					order: 'asc',
					type: 'natural',
				},
			],
			'perfectionist/sort-interfaces': ['warn'],
			'perfectionist/sort-object-types': [
				'warn',
				{ type: 'alphabetical' },
			],
			'perfectionist/sort-objects': ['warn', { type: 'alphabetical' }],
			'perfectionist/sort-objects': ['warn', { type: 'alphabetical' }],
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: false,
					ignoreCase: true,
					locale: 'en-US',
					reservedFirst: false,
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];

export default eslintConfig;
