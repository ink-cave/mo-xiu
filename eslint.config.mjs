// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [
			"node_modules/**",
			"dist/**",
			"build/**",
			".next/**",
			"out/**",
			"**/*.d.ts",
			"eslint.config.mjs",
			"**/postcss.config.mjs",
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
				...globals.jest,
				React: "readonly",
			},
			sourceType: "module",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unsafe-member-access": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"prettier/prettier": ["error", { endOfLine: "auto" }],
			"no-console": "warn",
			"no-unused-vars": "warn",
			"no-undef": "error",
		},
	},
	{
		files: ["apps/server/**/*.ts"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
	{
		files: ["apps/website/**/*.ts", "apps/website/**/*.tsx"],
		languageOptions: {
			globals: {
				...globals.browser,
				React: "readonly",
			},
		},
	}
);
