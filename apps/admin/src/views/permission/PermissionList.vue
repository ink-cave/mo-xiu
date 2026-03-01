<template>
	<div
		class="bg-white rounded-lg p-5 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
	>
		<!-- 快捷按钮区域 -->
		<div class="flex gap-2.5 mb-5">
			<el-button type="primary" v-permission="'btn:add'" @click="handleAdd">
				<el-icon><Plus /></el-icon>
				新增权限
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
				placeholder="请输入权限名称"
				class="w-[300px]"
				prefix-icon="Search"
			/>
			<el-select v-model="typeFilter" placeholder="权限类型" class="w-[150px]">
				<el-option label="全部" value="" />
				<el-option label="菜单" value="menu" />
				<el-option label="按钮" value="button" />
			</el-select>
			<el-button type="primary" @click="handleSearch">搜索</el-button>
		</div>

		<!-- 数据表格 -->
		<CommonTable
			:data="permissions"
			:loading="loading"
			:show-action="true"
			action-width="200px"
		>
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="code" label="权限编码" />
			<el-table-column prop="name" label="权限名称" />
			<el-table-column prop="type" label="类型">
				<template #default="scope">
					<el-tag :type="scope.row.type === 'menu' ? 'success' : 'info'">
						{{ scope.row.type === "menu" ? "菜单" : "按钮" }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				prop="path"
				label="路径"
				v-if="typeFilter !== 'button'"
			/>
			<el-table-column
				prop="icon"
				label="图标"
				v-if="typeFilter !== 'button'"
			/>
			<el-table-column prop="sort" label="排序" width="80" />
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

		<!-- 权限表单弹框 -->
		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
			<el-form
				:model="formData"
				:rules="formRules"
				ref="formRef"
				label-width="80px"
			>
				<el-form-item label="权限编码" prop="code">
					<el-input v-model="formData.code" placeholder="请输入权限编码" />
				</el-form-item>
				<el-form-item label="权限名称" prop="name">
					<el-input v-model="formData.name" placeholder="请输入权限名称" />
				</el-form-item>
				<el-form-item label="权限类型" prop="type">
					<el-select v-model="formData.type" placeholder="请选择权限类型">
						<el-option label="菜单" value="menu" />
						<el-option label="按钮" value="button" />
					</el-select>
				</el-form-item>
				<el-form-item
					label="父权限"
					prop="parentId"
					v-if="formData.type === 'menu'"
				>
					<el-select v-model="formData.parentId" placeholder="请选择父权限">
						<el-option label="无" value="" />
						<el-option
							v-for="perm in parentPermissions"
							:key="perm.id"
							:label="perm.name"
							:value="perm.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="路径" prop="path" v-if="formData.type === 'menu'">
					<el-input v-model="formData.path" placeholder="请输入菜单路径" />
				</el-form-item>
				<el-form-item label="图标" prop="icon" v-if="formData.type === 'menu'">
					<el-input v-model="formData.icon" placeholder="请输入图标名称" />
				</el-form-item>
				<el-form-item label="排序" prop="sort">
					<el-input-number
						v-model="formData.sort"
						:min="0"
						placeholder="请输入排序"
					/>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input
						v-model="formData.description"
						placeholder="请输入权限描述"
						type="textarea"
						rows="3"
					/>
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

		<!-- 权限详情弹框 -->
		<el-dialog v-model="detailVisible" title="权限详情" width="500px">
			<el-descriptions :column="1" border>
				<el-descriptions-item label="权限ID">{{
					detailData.id
				}}</el-descriptions-item>
				<el-descriptions-item label="权限编码">{{
					detailData.code
				}}</el-descriptions-item>
				<el-descriptions-item label="权限名称">{{
					detailData.name
				}}</el-descriptions-item>
				<el-descriptions-item label="权限类型">{{
					detailData.type === "menu" ? "菜单" : "按钮"
				}}</el-descriptions-item>
				<el-descriptions-item label="父权限">{{
					detailData.parentId ? getParentName(detailData.parentId) : "无"
				}}</el-descriptions-item>
				<el-descriptions-item label="路径" v-if="detailData.type === 'menu'">{{
					detailData.path
				}}</el-descriptions-item>
				<el-descriptions-item label="图标" v-if="detailData.type === 'menu'">{{
					detailData.icon
				}}</el-descriptions-item>
				<el-descriptions-item label="排序">{{
					detailData.sort
				}}</el-descriptions-item>
				<el-descriptions-item label="描述">{{
					detailData.description
				}}</el-descriptions-item>
				<el-descriptions-item label="创建时间">{{
					formatDate(detailData.createdAt)
				}}</el-descriptions-item>
				<el-descriptions-item label="更新时间">{{
					formatDate(detailData.updatedAt)
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
import { computed, ref, onMounted } from "vue";
import { permissionApi } from "../../api";
import { formatDate, message, confirm } from "../../utils";
import CommonTable from "../../components/CommonTable.vue";
import CommonPagination from "../../components/CommonPagination.vue";

// 状态管理
const loading = ref(false);
const submitting = ref(false);
const permissions = ref<any[]>([]);
const parentPermissions = ref<any[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const searchQuery = ref("");
const typeFilter = ref("");

// 弹框状态
const dialogVisible = ref(false);
const detailVisible = ref(false);
const dialogTitle = ref("");
const formRef = ref<any>(null);
const formData = ref({
	id: 0,
	code: "",
	name: "",
	type: "menu",
	parentId: "",
	path: "",
	icon: "",
	sort: 0,
	description: "",
});
const detailData = ref({
	id: 0,
	code: "",
	name: "",
	type: "",
	parentId: "",
	path: "",
	icon: "",
	sort: 0,
	description: "",
	createdAt: "",
	updatedAt: "",
});

// 表单验证规则
const formRules = {
	code: [
		{ required: true, message: "请输入权限编码", trigger: "blur" },
		{ min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" },
	],
	name: [
		{ required: true, message: "请输入权限名称", trigger: "blur" },
		{ min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "blur" },
	],
	type: [{ required: true, message: "请选择权限类型", trigger: "change" }],
	path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
	sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
};

// 生命周期
onMounted(() => {
	fetchPermissions();
	fetchParentPermissions();
});

// 获取权限列表
const fetchPermissions = async () => {
	loading.value = true;
	try {
		const response = await permissionApi.getAllPermissions();
		let filteredPermissions = response;

		// 搜索过滤
		if (searchQuery.value) {
			filteredPermissions = filteredPermissions.filter((perm) =>
				perm.name.includes(searchQuery.value)
			);
		}

		// 类型过滤
		if (typeFilter.value) {
			filteredPermissions = filteredPermissions.filter(
				(perm) => perm.type === typeFilter.value
			);
		}

		permissions.value = filteredPermissions;
		total.value = filteredPermissions.length;
	} catch (error) {
		console.error("获取权限列表失败:", error);
		message.error("获取权限列表失败");
	} finally {
		loading.value = false;
	}
};

// 获取父权限列表
const fetchParentPermissions = async () => {
	try {
		const response = await permissionApi.getAllPermissions();
		parentPermissions.value = response.filter((perm) => perm.type === "menu");
	} catch (error) {
		console.error("获取父权限列表失败:", error);
	}
};

// 刷新数据
const handleRefresh = () => {
	fetchPermissions();
	fetchParentPermissions();
};

// 搜索
const handleSearch = () => {
	currentPage.value = 1;
	fetchPermissions();
};

// 分页相关方法
const handleSizeChange = (size: number) => {
	pageSize.value = size;
	currentPage.value = 1;
	fetchPermissions();
};

const handleCurrentChange = (current: number) => {
	currentPage.value = current;
	fetchPermissions();
};

// 新增权限
const handleAdd = () => {
	dialogTitle.value = "新增权限";
	formData.value = {
		id: 0,
		code: "",
		name: "",
		type: "menu",
		parentId: "",
		path: "",
		icon: "",
		sort: 0,
		description: "",
	};
	dialogVisible.value = true;
};

// 编辑权限
const handleEdit = (permission: any) => {
	dialogTitle.value = "编辑权限";
	formData.value = { ...permission };
	dialogVisible.value = true;
};

// 查看权限详情
const handleView = async (permission: any) => {
	try {
		detailData.value = permission;
		detailVisible.value = true;
	} catch (error) {
		console.error("获取权限详情失败:", error);
		message.error("获取权限详情失败");
	}
};

// 删除权限
const handleDelete = (id: number) => {
	confirm
		.delete("确定要删除这个权限吗？")
		.then(async () => {
			try {
				await permissionApi.deletePermission(id);
				message.success("删除成功");
				fetchPermissions();
			} catch (error) {
				console.error("删除权限失败:", error);
				message.error("删除权限失败");
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
					// 更新权限
					await permissionApi.updatePermission(
						formData.value.id,
						formData.value
					);
					message.success("更新成功");
				} else {
					// 创建权限
					await permissionApi.createPermission(formData.value);
					message.success("创建成功");
				}
				dialogVisible.value = false;
				fetchPermissions();
			} catch (error) {
				console.error("操作失败:", error);
				message.error("操作失败");
			} finally {
				submitting.value = false;
			}
		}
	});
};

// 获取父权限名称
const getParentName = (parentId: number) => {
	const parent = parentPermissions.value.find((p) => p.id === parentId);
	return parent ? parent.name : "无";
};
</script>

<style scoped></style>
