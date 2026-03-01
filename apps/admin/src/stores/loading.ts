import { defineStore } from "pinia";
import { ref } from "vue";

// Loading store
export const useLoadingStore = defineStore("loading", () => {
	const loading = ref(false);
	const loadingCount = ref(0);

	function show() {
		loadingCount.value++;
		loading.value = true;
	}

	function hide() {
		if (loadingCount.value > 0) {
			loadingCount.value--;
		}
		if (loadingCount.value === 0) {
			loading.value = false;
		}
	}

	function reset() {
		loadingCount.value = 0;
		loading.value = false;
	}

	return {
		loading,
		loadingCount,
		show,
		hide,
		reset,
	};
});
