<template>
	<div v-if="loadingStore.loading" class="global-loading-overlay">
		<div class="global-loading-content">
			<el-spinner :size="40" />
			<p class="mt-2">加载中...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "../stores";

const loadingStore = useLoadingStore();
</script>

<style scoped>
.global-loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}

.global-loading-content {
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	text-align: center;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
