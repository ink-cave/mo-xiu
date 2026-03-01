import { defineStore } from "pinia";
import { ref } from "vue";

// Theme store
export const useThemeStore = defineStore("theme", () => {
	const dark = ref(localStorage.getItem("dark") === "true");

	function toggle() {
		dark.value = !dark.value;
		console.log("Theme toggle:", dark.value);

		// 确保根元素的 dark 类与主题状态同步
		if (dark.value) {
			document.documentElement.classList.add("dark");
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.setAttribute("data-theme", "light");
		}

		// 保存主题设置到 localStorage
		localStorage.setItem("dark", dark.value.toString());

		// 通知 Element Plus 更新主题
		if (window.ElementPlus) {
			window.ElementPlus.config.dark = dark.value;
		}
	}

	return {
		dark,
		toggle,
	};
});
