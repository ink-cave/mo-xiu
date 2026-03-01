import { defineStore } from "pinia";
import { systemApi } from "@/api";

interface SystemConfig {
	systemName: string;
	systemLogo: string;
	captchaEnabled: boolean;
	sessionTimeout: number;
}

export const useSystemStore = defineStore("system", {
	state: (): {
		config: SystemConfig;
		loading: boolean;
	} => ({
		config: {
			systemName: "后台管理系统",
			systemLogo: "",
			captchaEnabled: true,
			sessionTimeout: 24,
		},
		loading: false,
	}),

	getters: {
		systemName: (state) => state.config.systemName,
		systemLogo: (state) => state.config.systemLogo,
	},

	actions: {
		async fetchSystemConfig() {
			this.loading = true;
			try {
				const config = await systemApi.getSystemConfig();
				this.config = config;
			} catch (error) {
				console.error("获取系统配置失败:", error);
			} finally {
				this.loading = false;
			}
		},

		updateSystemConfig(config: Partial<SystemConfig>) {
			this.config = { ...this.config, ...config };
		},
	},
});
