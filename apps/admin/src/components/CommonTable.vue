<template>
	<el-table
		:data="data"
		:loading="loading"
		:border="border"
		:stripe="stripe"
		:size="size"
		style="width: 100%"
		@selection-change="handleSelectionChange"
		@row-click="handleRowClick"
	>
		<!-- 选择列 -->
		<el-table-column v-if="showSelection" type="selection" width="55" />

		<!-- 自定义列 -->
		<slot />

		<!-- 操作列 -->
		<el-table-column
			v-if="showAction"
			label="操作"
			:width="actionWidth"
			fixed="right"
		>
			<template #default="scope">
				<slot name="action" :row="scope.row" :index="scope.$index" />
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
	border: {
		type: Boolean,
		default: true,
	},
	stripe: {
		type: Boolean,
		default: true,
	},
	size: {
		type: String,
		default: "default",
	},
	showSelection: {
		type: Boolean,
		default: false,
	},
	showAction: {
		type: Boolean,
		default: false,
	},
	actionWidth: {
		type: String,
		default: "200px",
	},
});

const emit = defineEmits(["selection-change", "row-click"]);

const handleSelectionChange = (selection: any[]) => {
	emit("selection-change", selection);
};

const handleRowClick = (row: any, column: any, event: any) => {
	emit("row-click", row, column, event);
};
</script>

<style scoped></style>
