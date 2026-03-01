import { defineStore } from "pinia";
import { ref } from "vue";

// Tabs store
export const useTabsStore = defineStore("tabs", () => {
	const tabs = ref([
		{
			id: "1",
			name: "首页",
			path: "/home",
			fixed: true,
		},
	]);
	const activeTab = ref("/home");

	function addTab(tab: {
		id: string;
		name: string;
		path: string;
		fixed: boolean;
	}) {
		const existingTab = tabs.value.find((t) => t.path === tab.path);
		if (existingTab) {
			// 如果标签页已存在，更新名称
			existingTab.name = tab.name;
		} else {
			tabs.value.push(tab);
		}
		activeTab.value = tab.path;
	}

	function removeTab(path: string) {
		const index = tabs.value.findIndex((t) => t.path === path);
		if (index > -1 && !tabs.value[index].fixed) {
			tabs.value.splice(index, 1);
			if (activeTab.value === path) {
				activeTab.value = tabs.value[tabs.value.length - 1]?.path || "";
			}
		}
	}

	function setActiveTab(path: string) {
		activeTab.value = path;
	}

	function clearTabs() {
		// 只保留fixed的tab（首页）
		tabs.value = tabs.value.filter((tab) => tab.fixed);
		activeTab.value = "/home";
	}

	return {
		tabs,
		activeTab,
		addTab,
		removeTab,
		setActiveTab,
		clearTabs,
	};
});
