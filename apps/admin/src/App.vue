<template>
	<div class="app-container">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
		<GlobalLoading />
	</div>
</template>

<script setup lang="ts">
// App.vue - Main application component
import GlobalLoading from "./components/GlobalLoading.vue";
</script>

<style scoped>
.app-container {
	min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
