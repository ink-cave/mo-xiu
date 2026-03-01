<template>
	<div
		class="bg-white rounded-lg p-5 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
	>
		<h2 class="mb-5 text-gray-800 dark:text-white">系统管理</h2>
		<!-- 子路由视图 -->
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
