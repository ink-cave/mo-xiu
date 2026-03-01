import { defineStore } from "pinia";
import { ref } from "vue";

// Sidebar store
export const useSidebarStore = defineStore("sidebar", () => {
	const collapsed = ref(false);

	function toggle() {
		collapsed.value = !collapsed.value;
	}

	return {
		collapsed,
		toggle,
	};
});
