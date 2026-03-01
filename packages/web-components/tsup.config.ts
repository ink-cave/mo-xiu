import { defineConfig } from "tsup";

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/components/Button/index.ts",
		"src/components/Input/index.ts",
		"src/components/Card/index.ts",
		"src/components/Slider/index.ts",
		"src/components/Switch/index.ts",
		"src/components/Checkbox/index.ts",
		"src/components/Radio/index.ts",
	],
	format: ["cjs", "esm"],
	dts: true,
	outDir: "dist",
	clean: true,
});
