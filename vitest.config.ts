import tsconfigPaths from "vite-tsconfig-paths"; // 如果使用路径别名，需要安装此插件
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()], // 让 Vitest 理解 TypeScript 路径别名
	test: {
		globals: true, // 可选，启用全局 API（describe, it, expect 等无需导入）
		environment: "jsdom", // 或 'happy-dom'，根据需求选择
		setupFiles: ["./test-setup.ts"], // 可选，全局测试初始化文件
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
		include: [
			// 默认匹配规则，可根据需要调整
			"packages/**/*.{test,spec}.{ts,tsx}",
			"apps/**/*.{test,spec}.{ts,tsx}",
		],
	},
});
