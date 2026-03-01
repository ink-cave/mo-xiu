<template>
	<div
		class="bg-white rounded-lg p-5 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
	>
		<!-- 快捷按钮区域 -->
		<div class="flex gap-2.5 mb-5">
			<el-button
				v-if="
					userStore.userInfo?.role === UserRole.SUPER_ADMIN ||
					userStore.userInfo?.role === UserRole.ADMIN
				"
				type="primary"
				@click="addUser"
			>
				<el-icon><Plus /></el-icon>
				新增
			</el-button>
			<el-button @click="exportUsers">
				<el-icon><Download /></el-icon>
				导出
			</el-button>
			<el-button @click="refresh">
				<el-icon><Refresh /></el-icon>
				刷新
			</el-button>
		</div>

		<!-- 搜索过滤模块 -->
		<div class="flex gap-2.5 mb-5">
			<el-input
				v-model="searchQuery"
				placeholder="请输入用户名"
				class="w-75"
				prefix-icon="Search"
			/>
			<el-button type="primary" @click="search">搜索</el-button>
		</div>

		<!-- 数据表格 -->
		<el-table :data="filteredUsers" style="width: 100%" class="mb-5">
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="username" label="用户名" />
			<el-table-column prop="email" label="邮箱" />
			<el-table-column prop="role" label="角色">
				<template #default="scope">
					{{
						scope.row.role === UserRole.SUPER_ADMIN
							? "超级管理员"
							: scope.row.role === UserRole.ADMIN
								? "管理员"
								: scope.row.role === UserRole.TEST
									? "测试"
									: scope.row.role === UserRole.DEVELOPER
										? "开发"
										: "其他"
					}}
				</template>
			</el-table-column>
			<el-table-column prop="status" label="状态">
				<template #default="scope">
					<el-tag
						:type="
							scope.row.status === UserStatus.ACTIVE ? 'success' : 'danger'
						"
					>
						{{ scope.row.status === UserStatus.ACTIVE ? "激活" : "禁用" }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建时间" width="180" />
			<el-table-column label="操作" width="150">
				<template #default="scope">
					<!-- 超级管理员和管理员可以操作增删改 -->
					<!-- 超级管理员能改其他用户，包括管理员 -->
					<!-- 管理员只能改普通用户，不能改超级管理员 -->
					<!-- 普通用户只能编辑自己 -->
					<el-button
						v-if="
							userStore.userInfo?.role === UserRole.SUPER_ADMIN ||
							(userStore.userInfo?.role === UserRole.ADMIN &&
								scope.row.role !== UserRole.SUPER_ADMIN) ||
							scope.row.id === userStore.userInfo?.id
						"
						size="small"
						type="primary"
						@click="editUser(scope.row)"
					>
						编辑
					</el-button>
					<el-button
						v-if="
							userStore.userInfo?.role === UserRole.SUPER_ADMIN ||
							(userStore.userInfo?.role === UserRole.ADMIN &&
								scope.row.role !== UserRole.SUPER_ADMIN)
						"
						size="small"
						type="danger"
						@click="deleteUser(scope.row)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div class="flex justify-end">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[10, 20, 50, 100]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="filteredUsers.length"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>

		<!-- 新增/编辑用户弹框 -->
		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
			<el-form ref="userFormRef" :model="userForm" label-width="80px">
				<el-form-item
					label="用户名"
					prop="username"
					:rules="[
						{ required: true, message: '用户名不能为空', trigger: 'blur' },
						{
							min: 3,
							max: 50,
							message: '用户名长度不能少于3个字符且不能超过50个字符',
							trigger: 'blur',
						},
					]"
				>
					<el-input v-model="userForm.username" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item
					label="邮箱"
					prop="email"
					:rules="[
						{ type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
					]"
				>
					<el-input v-model="userForm.email" placeholder="请输入邮箱" />
				</el-form-item>
				<el-form-item
					v-if="dialogType === 'add'"
					label="密码"
					prop="password"
					:rules="[
						{
							min: 6,
							max: 100,
							message: '密码长度不能少于6个字符且不能超过100个字符',
							trigger: 'blur',
						},
					]"
				>
					<el-input
						v-model="userForm.password"
						type="password"
						placeholder="请输入密码（不填默认123456）"
					/>
				</el-form-item>
				<el-form-item
					label="角色"
					prop="role"
					:rules="[
						{ required: true, message: '角色不能为空', trigger: 'blur' },
					]"
				>
					<el-select v-model="userForm.role" placeholder="请选择角色">
						<el-option
							v-if="userStore.userInfo?.role === UserRole.SUPER_ADMIN"
							label="超级管理员"
							:value="UserRole.SUPER_ADMIN"
						/>
						<el-option label="管理员" :value="UserRole.ADMIN" />
						<el-option label="测试" :value="UserRole.TEST" />
						<el-option label="开发" :value="UserRole.DEVELOPER" />
						<el-option label="其他" :value="UserRole.OTHER" />
					</el-select>
				</el-form-item>
				<el-form-item
					label="状态"
					prop="status"
					:rules="[
						{ required: true, message: '状态不能为空', trigger: 'blur' },
					]"
				>
					<el-select v-model="userForm.status" placeholder="请选择状态">
						<el-option label="激活" :value="UserStatus.ACTIVE" />
						<el-option label="禁用" :value="UserStatus.DISABLED" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="submitUser">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { userApi } from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { UserRole, UserStatus } from "@/types/user";

// 从用户状态管理中获取当前用户角色
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// 检查是否为管理员
const isAdmin = computed(() => {
	return (
		userStore.userInfo?.role === UserRole.ADMIN ||
		userStore.userInfo?.role === UserRole.SUPER_ADMIN
	);
});

// 用户数据
const users = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(10);

// 弹框相关数据
const dialogVisible = ref(false);
const dialogType = ref<string>("add"); // 'add' 或 'edit'
const dialogTitle = ref("新增用户");
const userFormRef = ref();
const userForm = ref({
	id: "",
	username: "",
	email: "",
	password: "",
	role: UserRole.OTHER,
	status: UserStatus.ACTIVE,
});

// 过滤用户数据
const filteredUsers = computed(() => {
	let result = users.value;

	if (searchQuery.value) {
		result = result.filter((user) => user.username.includes(searchQuery.value));
	}

	return result;
});

// 获取用户列表
const getUserList = async () => {
	loading.value = true;
	try {
		const response = await userApi.getUserList();
		// 确保返回的数据是数组，并且每个用户都有ID
		users.value = Array.isArray(response)
			? response.filter((user) => user && user.id)
			: [];
	} catch (error) {
		ElMessage.error("获取用户列表失败");
		console.error("获取用户列表失败:", error);
		// 即使获取失败，也要确保users是一个空数组，避免页面显示空白
		users.value = [];
	} finally {
		loading.value = false;
	}
};

// 新增用户
const addUser = () => {
	dialogType.value = "add";
	dialogTitle.value = "新增用户";
	userForm.value = {
		id: "",
		username: "",
		email: "",
		password: "",
		role: UserRole.OTHER,
		status: UserStatus.ACTIVE,
	};
	dialogVisible.value = true;
};

// 编辑用户
const editUser = (user: any) => {
	dialogType.value = "edit";
	dialogTitle.value = "编辑用户";
	userForm.value = {
		id: user.id,
		username: user.username,
		email: user.email,
		password: "",
		role: user.role,
		status: user.status,
	};
	dialogVisible.value = true;
};

// 提交用户
const submitUser = async () => {
	if (!userFormRef.value) return;

	try {
		await userFormRef.value.validate();

		if (dialogType.value === "add") {
			// 只发送服务器端CreateUserDto期望的字段
			const createData: any = {
				username: userForm.value.username,
				email: userForm.value.email,
				role: userForm.value.role,
				status: userForm.value.status,
			};
			// 只有当密码不为空时才传递密码字段
			if (userForm.value.password) {
				createData.password = userForm.value.password;
			}
			await userApi.createUser(createData);
			ElMessage.success("新增用户成功");
		} else {
			// 只发送服务器端UpdateUserDto期望的字段，不传递密码
			const updateData: any = {
				username: userForm.value.username,
				email: userForm.value.email,
				role: userForm.value.role,
				status: userForm.value.status,
			};
			await userApi.updateUser(Number(userForm.value.id), updateData);
			ElMessage.success("编辑用户成功");
		}

		dialogVisible.value = false;
		await getUserList();
	} catch (error) {
		if (error === false) {
			// 表单验证失败，Element Plus 会自动显示错误信息
			return;
		}
		ElMessage.error("操作失败");
		console.error("操作失败:", error);
	}
};

// 删除用户
const deleteUser = async (user: any) => {
	try {
		// 检查是否是当前登录的管理员用户
		if (
			user.id === userStore.userInfo?.id &&
			userStore.userInfo?.role === "admin"
		) {
			ElMessage.warning("管理员不能删除自己");
			return;
		}

		// 确保用户ID存在
		if (!user.id) {
			ElMessage.error("用户ID不存在");
			return;
		}

		await ElMessageBox.confirm(
			`确定要删除用户 ${user.username} 吗？`,
			"删除确认",
			{
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}
		);

		await userApi.deleteUser(user.id);
		ElMessage.success("删除用户成功");
		await getUserList();
	} catch (error) {
		if (error !== "cancel") {
			ElMessage.error("删除用户失败");
			console.error("删除用户失败:", error);
		}
	}
};

// 分页相关方法
const handleSizeChange = (size: number) => {
	pageSize.value = size;
	currentPage.value = 1;
	getUserList();
};

const handleCurrentChange = (current: number) => {
	currentPage.value = current;
	getUserList();
};

// 搜索方法
const search = () => {
	currentPage.value = 1;
	getUserList();
};

// 刷新方法
const refresh = () => {
	getUserList();
};

// 导出方法
const exportUsers = () => {
	ElMessage.info("导出用户功能待实现");
};

// 页面挂载时获取用户列表
onMounted(async () => {
	// 确保用户信息已经获取到，以保证权限正确
	if (!userStore.userInfo && userStore.token) {
		await userStore.fetchUserInfo();
	}
	// 自动获取用户列表
	await getUserList();
});

// 监听路由变化，当路由切换到用户列表页面时请求数据
watch(
	() => route.path,
	async (newPath) => {
		if (newPath === "/home/user") {
			await getUserList();
		}
	}
);
</script>

<style scoped></style>
