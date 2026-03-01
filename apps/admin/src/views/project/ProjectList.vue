<template>
	<div
		class="bg-white rounded-lg p-5 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
	>
		<!-- 快捷按钮区域 -->
		<div class="flex gap-2.5 mb-5">
			<el-button type="primary" @click="handleAdd">
				<el-icon><Plus /></el-icon>
				新增
			</el-button>
			<el-button @click="handleRefresh">
				<el-icon><Refresh /></el-icon>
				刷新
			</el-button>
		</div>

		<!-- 搜索过滤模块 -->
		<div class="flex gap-2.5 mb-5">
			<el-input
				v-model="searchQuery"
				placeholder="请输入项目名称"
				class="w-[300px]"
				prefix-icon="Search"
			/>
			<el-button type="primary" @click="handleSearch">搜索</el-button>
		</div>

		<!-- 数据表格 -->
		<CommonTable
			:data="paginatedProjects"
			:loading="loading"
			:show-action="true"
			action-width="200px"
		>
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="name" label="项目名称" />
			<el-table-column prop="description" label="项目描述" />
			<el-table-column prop="status" label="状态">
				<template #default="scope">
					<el-tag :type="getTagType(scope.row.status)">
						{{ getStatusText(scope.row.status) }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="creator" label="创建人" />
			<el-table-column prop="createdAt" label="创建时间" width="180">
				<template #default="scope">
					{{ formatDate(scope.row.createdAt) }}
				</template>
			</el-table-column>
			<template #action="{ row }">
				<el-button
					size="small"
					type="primary"
					v-permission="'btn:view'"
					@click="handleView(row)"
					>查看</el-button
				>
				<el-button
					size="small"
					type="warning"
					v-permission="'btn:edit'"
					@click="handleEdit(row)"
					>编辑</el-button
				>
				<el-button
					size="small"
					type="danger"
					v-permission="'btn:delete'"
					@click="handleDelete(row.id)"
					>删除</el-button
				>
			</template>
		</CommonTable>

		<!-- 分页 -->
		<CommonPagination
			:current-page="currentPage"
			:page-size="pageSize"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>

		<!-- 项目表单弹框 -->
		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
			<el-form
				:model="formData"
				:rules="formRules"
				ref="formRef"
				label-width="80px"
			>
				<el-form-item label="项目名称" prop="name">
					<el-input v-model="formData.name" placeholder="请输入项目名称" />
				</el-form-item>
				<el-form-item label="项目描述" prop="description">
					<el-input
						v-model="formData.description"
						placeholder="请输入项目描述"
						type="textarea"
						rows="3"
					/>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="formData.status" placeholder="请选择状态">
						<el-option label="进行中" value="active" />
						<el-option label="已完成" value="completed" />
						<el-option label="待开始" value="pending" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleSubmit" :loading="submitting"
						>确定</el-button
					>
				</span>
			</template>
		</el-dialog>

		<!-- 项目详情弹框 -->
		<el-dialog v-model="detailVisible" title="项目详情" width="500px">
			<el-descriptions :column="1" border>
				<el-descriptions-item label="项目ID">{{
					detailData.id
				}}</el-descriptions-item>
				<el-descriptions-item label="项目名称">{{
					detailData.name
				}}</el-descriptions-item>
				<el-descriptions-item label="项目描述">{{
					detailData.description
				}}</el-descriptions-item>
				<el-descriptions-item label="状态">
					<el-tag :type="getTagType(detailData.status)">
						{{ getStatusText(detailData.status) }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="创建人">{{
					detailData.creator
				}}</el-descriptions-item>
				<el-descriptions-item label="创建时间">{{
					formatDate(detailData.createdAt)
				}}</el-descriptions-item>
			</el-descriptions>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="detailVisible = false">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { projectApi } from "../../api";
import { formatDate, message, confirm } from "../../utils";
import CommonTable from "../../components/CommonTable.vue";
import CommonPagination from "../../components/CommonPagination.vue";

// 状态管理
const loading = ref(false);
const submitting = ref(false);
const projects = ref<any[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const searchQuery = ref("");
const route = useRoute();

// 弹框状态
const dialogVisible = ref(false);
const detailVisible = ref(false);
const dialogTitle = ref("");
const formRef = ref<any>(null);
const formData = ref({
	id: 0,
	name: "",
	description: "",
	status: "active",
});
const detailData = ref({
	id: 0,
	name: "",
	description: "",
	status: "",
	creator: "",
	createdAt: "",
});

// 表单验证规则
const formRules = {
	name: [
		{ required: true, message: "请输入项目名称", trigger: "blur" },
		{ min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" },
	],
	description: [
		{ max: 200, message: "长度不超过 200 个字符", trigger: "blur" },
	],
	status: [{ required: true, message: "请选择状态", trigger: "change" }],
};

// 分页数据
const paginatedProjects = computed(() => {
	const start = (currentPage.value - 1) * pageSize.value;
	const end = start + pageSize.value;
	return projects.value.slice(start, end);
});

// 生命周期
onMounted(() => {
	// 自动获取项目列表
	fetchProjects();
});

// 监听路由变化，当路由切换到项目列表页面时请求数据
watch(
	() => route.path,
	async (newPath) => {
		if (newPath === "/home/project") {
			await fetchProjects();
		}
	}
);

// 获取项目列表
const fetchProjects = async () => {
	loading.value = true;
	try {
		const response = await projectApi.getProjectList({
			page: currentPage.value,
			size: pageSize.value,
		});
		projects.value = response.data || [];
		total.value = response.total || projects.value.length;
	} catch (error) {
		console.error("获取项目列表失败:", error);
		message.error("获取项目列表失败");
	} finally {
		loading.value = false;
	}
};

// 刷新数据
const handleRefresh = () => {
	fetchProjects();
};

// 搜索
const handleSearch = () => {
	currentPage.value = 1;
	fetchProjects();
};

// 分页相关方法
const handleSizeChange = (size: number) => {
	pageSize.value = size;
	currentPage.value = 1;
	fetchProjects();
};

const handleCurrentChange = (current: number) => {
	currentPage.value = current;
	fetchProjects();
};

// 新增项目
const handleAdd = () => {
	dialogTitle.value = "新增项目";
	formData.value = {
		id: 0,
		name: "",
		description: "",
		status: "active",
	};
	dialogVisible.value = true;
};

// 编辑项目
const handleEdit = (project: any) => {
	dialogTitle.value = "编辑项目";
	formData.value = { ...project };
	dialogVisible.value = true;
};

// 查看项目详情
const handleView = async (project: any) => {
	try {
		const response = await projectApi.getProjectDetail(project.id);
		detailData.value = response;
		detailVisible.value = true;
	} catch (error) {
		console.error("获取项目详情失败:", error);
		message.error("获取项目详情失败");
	}
};

// 删除项目
const handleDelete = (id: number) => {
	confirm
		.delete("确定要删除这个项目吗？")
		.then(async () => {
			try {
				await projectApi.deleteProject(id);
				message.success("删除成功");
				fetchProjects();
			} catch (error) {
				console.error("删除项目失败:", error);
				message.error("删除项目失败");
			}
		})
		.catch(() => {
			// 取消删除
		});
};

// 提交表单
const handleSubmit = async () => {
	if (!formRef.value) return;

	await formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			submitting.value = true;
			try {
				if (formData.value.id) {
					// 更新项目 - 只传递需要更新的字段
					const updateData = {
						name: formData.value.name,
						description: formData.value.description,
						status: formData.value.status,
					};
					await projectApi.updateProject(formData.value.id, updateData);
					message.success("更新成功");
				} else {
					// 创建项目
					await projectApi.createProject(formData.value);
					message.success("创建成功");
				}
				dialogVisible.value = false;
				fetchProjects();
			} catch (error) {
				console.error("操作失败:", error);
				message.error("操作失败");
			} finally {
				submitting.value = false;
			}
		}
	});
};

// 获取状态标签类型
const getTagType = (status: string) => {
	switch (status) {
		case "active":
			return "success";
		case "completed":
			return "info";
		case "pending":
			return "warning";
		default:
			return "";
	}
};

// 获取状态文本
const getStatusText = (status: string) => {
	switch (status) {
		case "active":
			return "进行中";
		case "completed":
			return "已完成";
		case "pending":
			return "待开始";
		default:
			return status;
	}
};
</script>

<style scoped></style>
