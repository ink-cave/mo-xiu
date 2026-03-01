<template>
	<div class="menu-management">
		<el-card class="mb-4">
			<template #header>
				<div class="flex justify-between items-center">
					<span>菜单管理</span>
					<el-button type="primary" @click="handleAdd">
						<el-icon><Plus /></el-icon>
						新增菜单
					</el-button>
				</div>
			</template>

			<el-tree
				v-if="menuTree.length > 0"
				:data="menuTree"
				:props="defaultProps"
				node-key="id"
				default-expand-all
				@node-click="handleNodeClick"
			>
				<template #default="{ node, data }">
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center">
							<el-icon v-if="data.icon">
								<!-- 直接使用 icon 字符串作为图标名称 -->
								<component :is="data.icon" />
							</el-icon>
							<span class="ml-2">{{ data.name }}</span>
							<el-tag v-if="data.type === 'dir'" size="small" class="ml-2"
								>目录</el-tag
							>
							<el-tag
								v-else-if="data.type === 'menu'"
								size="small"
								type="info"
								class="ml-2"
								>菜单</el-tag
							>
							<el-tag
								v-else-if="data.type === 'button'"
								size="small"
								type="warning"
								class="ml-2"
								>按钮</el-tag
							>
						</div>
						<div class="flex items-center">
							<el-button size="small" @click.stop="handleEdit(data)">
								<el-icon><Edit /></el-icon>
							</el-button>
							<el-button
								size="small"
								type="danger"
								@click.stop="handleDelete(data.id)"
							>
								<el-icon><Delete /></el-icon>
							</el-button>
						</div>
					</div>
				</template>
			</el-tree>
			<div v-else class="text-center py-10 text-gray-500">暂无菜单数据</div>
		</el-card>

		<!-- 新增/编辑菜单对话框 -->
		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
			<el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入菜单名称" />
				</el-form-item>

				<el-form-item label="类型" prop="type">
					<el-select v-model="form.type" placeholder="请选择菜单类型">
						<el-option label="目录" value="dir" />
						<el-option label="菜单" value="menu" />
						<el-option label="按钮" value="button" />
					</el-select>
				</el-form-item>

				<el-form-item label="父菜单" prop="parentId">
					<el-select v-model="form.parentId" placeholder="请选择父菜单">
						<el-option label="顶级菜单" :value="null" />
						<el-option
							v-for="menu in menuList"
							:key="menu.id"
							:label="menu.name"
							:value="menu.id"
							:disabled="menu.id === form.id"
						/>
					</el-select>
				</el-form-item>

				<el-form-item
					label="路由路径"
					prop="path"
					v-if="form.type !== 'button'"
				>
					<el-input v-model="form.path" placeholder="请输入路由路径" />
				</el-form-item>

				<el-form-item label="组件" prop="component" v-if="form.type === 'menu'">
					<el-input v-model="form.component" placeholder="请输入组件路径" />
				</el-form-item>

				<el-form-item label="权限标识" prop="permission">
					<el-input v-model="form.permission" placeholder="请输入权限标识" />
				</el-form-item>

				<el-form-item label="图标" prop="icon">
					<el-input v-model="form.icon" placeholder="请输入图标名称" />
				</el-form-item>

				<el-form-item label="排序号" prop="sort">
					<el-input-number
						v-model="form.sort"
						:min="0"
						placeholder="请输入排序号"
					/>
				</el-form-item>

				<el-form-item label="状态" prop="status">
					<el-switch
						v-model="form.status"
						active-value="1"
						inactive-value="0"
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleSubmit">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { menuApi } from "@/api/menu";
import type { FormInstance } from "element-plus";

const menuTree = ref<any[]>([]);
const menuList = ref<any[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref("新增菜单");
const form = ref({
	id: 0,
	name: "",
	type: "dir",
	parentId: null,
	path: "",
	component: "",
	permission: "",
	icon: "",
	sort: 0,
	status: 1,
});
const formRef = ref<FormInstance>();

const rules = {
	name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
	type: [{ required: true, message: "请选择菜单类型", trigger: "change" }],
	sort: [{ required: true, message: "请输入排序号", trigger: "blur" }],
};

const defaultProps = {
	children: "children",
	label: "name",
};

const loadMenuData = async () => {
	try {
		const [treeRes, listRes] = await Promise.all([
			menuApi.getMenuTree(),
			menuApi.getMenuList(),
		]);
		menuTree.value = treeRes.data;
		menuList.value = listRes.data;
	} catch (error) {
		console.error("加载菜单数据失败:", error);
	}
};

const handleAdd = () => {
	form.value = {
		id: 0,
		name: "",
		type: "dir",
		parentId: null,
		path: "",
		component: "",
		permission: "",
		icon: "",
		sort: 0,
		status: 1,
	};
	dialogTitle.value = "新增菜单";
	dialogVisible.value = true;
};

const handleEdit = (data: any) => {
	form.value = { ...data };
	dialogTitle.value = "编辑菜单";
	dialogVisible.value = true;
};

const handleDelete = async (id: number) => {
	try {
		await menuApi.deleteMenu(id);
		loadMenuData();
	} catch (error) {
		console.error("删除菜单失败:", error);
	}
};

const handleSubmit = async () => {
	if (!formRef.value) return;

	await formRef.value.validate(async (valid) => {
		if (valid) {
			try {
				if (form.value.id) {
					await menuApi.updateMenu(form.value.id, form.value);
				} else {
					await menuApi.createMenu(form.value);
				}
				dialogVisible.value = false;
				loadMenuData();
			} catch (error) {
				console.error("保存菜单失败:", error);
			}
		}
	});
};

const handleNodeClick = (data: any) => {
	console.log("点击节点:", data);
};

onMounted(() => {
	loadMenuData();
});
</script>

<style scoped>
.menu-management {
	padding: 20px;
}

.dialog-footer {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}
</style>
