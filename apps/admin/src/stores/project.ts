import { defineStore } from "pinia";
import { ref } from "vue";

// Project store
export const useProjectStore = defineStore("project", () => {
	const projects = ref<any[]>([]);
	const total = ref(0);
	const currentPage = ref(1);
	const pageSize = ref(10);
	const searchQuery = ref("");
	const loading = ref(false);

	function setProjects(data: any[]) {
		projects.value = data;
	}

	function setTotal(count: number) {
		total.value = count;
	}

	function setCurrentPage(page: number) {
		currentPage.value = page;
	}

	function setPageSize(size: number) {
		pageSize.value = size;
	}

	function setSearchQuery(query: string) {
		searchQuery.value = query;
	}

	function setLoading(isLoading: boolean) {
		loading.value = isLoading;
	}

	function resetFilters() {
		searchQuery.value = "";
		currentPage.value = 1;
		pageSize.value = 10;
	}

	return {
		projects,
		total,
		currentPage,
		pageSize,
		searchQuery,
		loading,
		setProjects,
		setTotal,
		setCurrentPage,
		setPageSize,
		setSearchQuery,
		setLoading,
		resetFilters,
	};
});
