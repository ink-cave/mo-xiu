<template>
	<div
		class="bg-white rounded-lg p-5 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
	>
		<!-- 角色选择区域 -->
		<div class="flex gap-2.5 mb-5">
			<el-select
				v-model="selectedRole"
				placeholder="请选择角色"
				class="w-[200px]"
			>
				<el-option label="管理员" value="admin" />
				<el-option label="测试" value="test" />
				<el-option label="开发" value="developer" />
				<el-option label="其他" value="other" />
			</el-select>
			<el-button
				type="primary"
				@click="fetchRolePermissions"
				:loading="loading"
			>
				<el-icon><Refresh /></el-icon>
				加载权限
			</el-button>
		</div>

		<!-- 权限树 -->
		<div class="mb-5">
			<el-tree
				v-if="permissions.length > 0"
				:data="permissions"
				show-checkbox
				node-key="id"
				:default-checked-keys="checkedPermissions"
				@check-change="handleCheckChange"
				:props="{
					children: 'children',
					label: 'name',
					disabled: (data) =>
						data.type === 'button' && !hasParentChecked(data.parentId),
				}"
			/>
			<el-empty v-else description="请先选择角色并加载权限" />
		</div>

		<!-- 操作按钮 -->
		<div class="flex gap-2.5 justify-end">
			<el-button @click="resetPermissions">重置</el-button>
			<el-button
				type="primary"
				v-permission="'btn:assign'"
				@click="savePermissions"
				:loading="saving"
			>
				保存权限
			</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { permissionApi } from "../../api";
import { message } from "../../utils";

// 状态管理
const loading = ref(false);
const saving = ref(false);
const selectedRole = ref("");
const permissions = ref<any[]>([]);
const allPermissions = ref<any[]>([]);
const checkedPermissions = ref<number[]>([]);

// 生命周期
onMounted(() => {
	fetchAllPermissions();
});

// 获取所有权限
const fetchAllPermissions = async () => {
	try {
		const response = await permissionApi.getAllPermissions();
		allPermissions.value = response;
	} catch (error) {
		console.error("获取所有权限失败:", error);
		message.error("获取所有权限失败");
	}
};

// 获取角色权限
const fetchRolePermissions = async () => {
	if (!selectedRole.value) {
		message.warning("请先选择角色");
		return;
	}

	loading.value = true;
	try {
		const response = await permissionApi.getPermissionsByRole(
			selectedRole.value
		);
		const rolePermissionIds = response.map((perm: any) => perm.id);
		checkedPermissions.value = rolePermissionIds;
		buildPermissionTree();
	} catch (error) {
		console.error("获取角色权限失败:", error);
		message.error("获取角色权限失败");
	} finally {
		loading.value = false;
	}
};

// 构建权限树
const buildPermissionTree = () => {
	const menuPermissions = allPermissions.value.filter(
		(perm: any) => perm.type === "menu"
	);
	const buttonPermissions = allPermissions.value.filter(
		(perm: any) => perm.type === "button"
	);

	// 构建菜单树
	const menuMap: Record<number, any> = {};
	const rootMenus: any[] = [];

	// 首先创建所有菜单节点
	for (const permission of menuPermissions) {
		menuMap[permission.id] = {
			id: permission.id,
			name: permission.name,
			type: permission.type,
			parentId: permission.parentId,
			children: [],
		};
	}

	// 构建菜单树结构
	for (const permission of menuPermissions) {
		if (permission.parentId === null || permission.parentId === undefined) {
			// 根菜单
			rootMenus.push(menuMap[permission.id]);
		} else {
			// 子菜单
			if (menuMap[permission.parentId]) {
				menuMap[permission.parentId].children.push(menuMap[permission.id]);
			}
		}
	}

	// 添加按钮权限作为叶子节点
	for (const permission of buttonPermissions) {
		permissions.value.push({
			id: permission.id,
			name: permission.name,
			type: permission.type,
			parentId: null,
			children: [],
		});
	}

	permissions.value = [...rootMenus, ...buttonPermissions];
};

// 处理权限勾选
const handleCheckChange = (
	data: any,
	checked: boolean,
	indeterminate: boolean
) => {
	if (checked) {
		checkedPermissions.value.push(data.id);
	} else {
		const index = checkedPermissions.value.indexOf(data.id);
		if (index > -1) {
			checkedPermissions.value.splice(index, 1);
		}
	}
};

// 检查父权限是否已勾选
const hasParentChecked = (parentId: number | null | undefined): boolean => {
	if (!parentId) {
		return false;
	}
	return checkedPermissions.value.includes(parentId);
};

// 重置权限
const resetPermissions = () => {
	if (selectedRole.value) {
		fetchRolePermissions();
	}
};

// 保存权限
const savePermissions = async () => {
	if (!selectedRole.value) {
		message.warning("请先选择角色");
		return;
	}

	saving.value = true;
	try {
		// 首先获取该角色当前的所有权限
		const currentPermissions = await permissionApi.getPermissionsByRole(
			selectedRole.value
		);
		const currentPermissionIds = currentPermissions.map((perm: any) => perm.id);

		// 计算需要添加和需要移除的权限
		const permissionsToAdd = checkedPermissions.value.filter(
			(id) => !currentPermissionIds.includes(id)
		);
		const permissionsToRemove = currentPermissionIds.filter(
			(id) => !checkedPermissions.value.includes(id)
		);

		// 批量添加权限
		for (const permissionId of permissionsToAdd) {
			await permissionApi.assignPermissionToRole({
				role: selectedRole.value,
				permissionId,
			});
		}

		// 批量移除权限
		for (const permissionId of permissionsToRemove) {
			await permissionApi.removePermissionFromRole({
				role: selectedRole.value,
				permissionId,
			});
		}

		message.success("权限保存成功");
	} catch (error) {
		console.error("保存权限失败:", error);
		message.error("保存权限失败");
	} finally {
		saving.value = false;
	}
};
</script>

<style scoped></style>
