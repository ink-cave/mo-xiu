import { resolve } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: resolve(__dirname, "../.."), // 从 apps/website 目录向上两级到项目根目录
	},
};

export default nextConfig;
