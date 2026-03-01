<template>
	<div class="flex justify-end mt-4">
		<el-pagination
			:current-page="currentPage"
			:page-size="pageSize"
			:page-sizes="pageSizes"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script setup lang="ts">
defineProps({
	currentPage: {
		type: Number,
		default: 1,
	},
	pageSize: {
		type: Number,
		default: 10,
	},
	total: {
		type: Number,
		default: 0,
	},
	pageSizes: {
		type: Array,
		default: () => [10, 20, 50, 100],
	},
});

const emit = defineEmits(["size-change", "current-change"]);

const handleSizeChange = (size: number) => {
	emit("size-change", size);
};

const handleCurrentChange = (current: number) => {
	emit("current-change", current);
};
</script>

<style scoped></style>
