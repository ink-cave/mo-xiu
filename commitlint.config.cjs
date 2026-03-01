module.exports = {
	extends: ["@commitlint/config-conventional"],
	// 可以自定义规则，例如允许的类型
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"test",
				"chore",
				"perf",
				"ci",
				"build",
				"revert",
			],
		],
	},
};
