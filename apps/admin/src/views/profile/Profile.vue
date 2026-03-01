<template>
	<div
		class="bg-white rounded-lg p-5 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
	>
		<h1 class="text-xl font-bold mb-5 dark:text-white">个人信息</h1>

		<!-- 个人信息卡片 -->
		<div class="mb-6">
			<el-card :body-style="{ padding: '20px' }">
				<template #header>
					<div class="flex justify-between items-center">
						<span class="font-semibold">基本信息</span>
						<el-button
							type="primary"
							size="small"
							@click="editMode = !editMode"
						>
							{{ editMode ? "取消" : "编辑" }}
						</el-button>
					</div>
				</template>

				<el-form
					:model="userInfo"
					:rules="formRules"
					ref="formRef"
					label-width="100px"
					v-if="editMode"
				>
					<el-form-item label="头像">
						<el-upload
							class="upload-demo"
							action="/api/user/upload-avatar"
							:headers="{ Authorization: `Bearer ${userStore.token}` }"
							:show-file-list="false"
							:on-success="handleAvatarUpload"
						>
							<template v-if="userInfo.avatar">
								<img
									:src="userInfo.avatar"
									class="w-20 h-20 object-cover rounded cursor-pointer"
								/>
							</template>
							<template v-else>
								<el-button type="primary">上传头像</el-button>
							</template>
						</el-upload>
					</el-form-item>
					<el-form-item label="用户名" prop="username">
						<el-input v-model="userInfo.username" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item label="昵称" prop="nickname">
						<el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input
							v-model="userInfo.email"
							type="email"
							placeholder="请输入邮箱"
						/>
					</el-form-item>
					<el-form-item label="角色">
						<el-select v-model="userInfo.role" disabled>
							<el-option label="超级管理员" :value="UserRole.SUPER_ADMIN" />
							<el-option label="管理员" :value="UserRole.ADMIN" />
							<el-option label="测试" :value="UserRole.TEST" />
							<el-option label="开发" :value="UserRole.DEVELOPER" />
							<el-option label="其他" :value="UserRole.OTHER" />
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-select v-model="userInfo.status" disabled>
							<el-option label="活跃" :value="UserStatus.ACTIVE" />
							<el-option label="禁用" :value="UserStatus.DISABLED" />
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="handleSubmit"
							:loading="submitting"
							>保存</el-button
						>
					</el-form-item>
				</el-form>

				<el-descriptions :column="1" border v-else>
					<el-descriptions-item label="头像">
						<template v-if="userInfo.avatar">
							<img
								:src="userInfo.avatar"
								class="w-20 h-20 object-cover rounded"
							/>
						</template>
						<template v-else>
							<el-avatar size="large">{{
								userInfo.username.charAt(0)
							}}</el-avatar>
						</template>
					</el-descriptions-item>
					<el-descriptions-item label="用户名">{{
						userInfo.username
					}}</el-descriptions-item>
					<el-descriptions-item label="昵称">{{
						userInfo.nickname || "未设置"
					}}</el-descriptions-item>
					<el-descriptions-item label="邮箱">{{
						userInfo.email
					}}</el-descriptions-item>
					<el-descriptions-item label="角色">
						<el-tag
							:type="
								userInfo.role === UserRole.ADMIN ||
								userInfo.role === UserRole.SUPER_ADMIN
									? 'danger'
									: 'info'
							"
						>
							{{
								userInfo.role === UserRole.SUPER_ADMIN
									? "超级管理员"
									: userInfo.role === UserRole.ADMIN
										? "管理员"
										: "普通用户"
							}}
						</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="状态">
						<el-tag
							:type="
								userInfo.status === UserStatus.ACTIVE ? 'success' : 'warning'
							"
						>
							{{ userInfo.status === UserStatus.ACTIVE ? "活跃" : "禁用" }}
						</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="创建时间">{{
						formatDate(userInfo.createdAt)
					}}</el-descriptions-item>
				</el-descriptions>
			</el-card>
		</div>

		<!-- 修改密码卡片 -->
		<div>
			<el-card :body-style="{ padding: '20px' }">
				<template #header>
					<div class="flex justify-between items-center">
						<span class="font-semibold">修改密码</span>
					</div>
				</template>

				<el-form
					:model="passwordForm"
					:rules="passwordRules"
					ref="passwordFormRef"
					label-width="100px"
				>
					<el-form-item label="原密码" prop="oldPassword">
						<el-input
							v-model="passwordForm.oldPassword"
							type="password"
							placeholder="请输入原密码"
						/>
					</el-form-item>
					<el-form-item label="新密码" prop="newPassword">
						<el-input
							v-model="passwordForm.newPassword"
							type="password"
							placeholder="请输入新密码"
						/>
					</el-form-item>
					<el-form-item label="确认密码" prop="confirmPassword">
						<el-input
							v-model="passwordForm.confirmPassword"
							type="password"
							placeholder="请确认新密码"
						/>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="handlePasswordSubmit"
							:loading="passwordSubmitting"
							>修改密码</el-button
						>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useUserStore } from "../../stores";
import { userApi } from "../../api";
import { formatDate, message } from "../../utils";
import { UserRole, UserStatus } from "@/types/user";

const userStore = useUserStore();
const formRef = ref<any>(null);
const passwordFormRef = ref<any>(null);
const editMode = ref(false);
const submitting = ref(false);
const passwordSubmitting = ref(false);

// 用户信息
const userInfo = reactive({
	id: 0,
	username: "",
	nickname: "",
	avatar: "",
	email: "",
	role: "",
	status: "",
	createdAt: "",
});

// 密码表单
const passwordForm = reactive({
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
});

// 表单验证规则
const formRules = {
	username: [
		{ required: true, message: "请输入用户名", trigger: "blur" },
		{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
	],
	email: [
		{ required: true, message: "请输入邮箱", trigger: "blur" },
		{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
	],
};

// 密码验证规则
const passwordRules = {
	oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
	newPassword: [
		{ required: true, message: "请输入新密码", trigger: "blur" },
		{ min: 6, message: "密码长度至少为 6 个字符", trigger: "blur" },
	],
	confirmPassword: [
		{ required: true, message: "请确认新密码", trigger: "blur" },
		{
			validator: (rule: any, value: string, callback: any) => {
				if (value !== passwordForm.newPassword) {
					callback(new Error("两次输入的密码不一致"));
				} else {
					callback();
				}
			},
			trigger: "blur",
		},
	],
};

// 生命周期
onMounted(async () => {
	await fetchUserInfo();
});

// 获取用户信息
const fetchUserInfo = async () => {
	try {
		await userStore.fetchUserInfo();
		if (userStore.userInfo) {
			Object.assign(userInfo, userStore.userInfo);
		} else {
			// 如果用户信息为空，可能是token过期，跳转到登录页
			console.error("获取用户信息失败: 用户信息为空");
			message.error("获取用户信息失败，请重新登录");
			window.location.href = "/login";
		}
	} catch (error) {
		console.error("获取用户信息失败:", error);
		message.error("获取用户信息失败，请重新登录");
		window.location.href = "/login";
	}
};

// 处理头像上传成功
const handleAvatarUpload = (response: any) => {
	if (response.url) {
		userInfo.avatar = response.url;
		message.success("头像上传成功");
	} else {
		message.error("头像上传失败");
	}
};

// 提交个人信息
const handleSubmit = async () => {
	if (!formRef.value) return;

	await formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			submitting.value = true;
			try {
				await userApi.updateUser(userInfo.id, {
					username: userInfo.username,
					nickname: userInfo.nickname,
					avatar: userInfo.avatar,
					email: userInfo.email,
				});
				message.success("更新成功");
				editMode.value = false;
				await fetchUserInfo();
			} catch (error) {
				console.error("更新失败:", error);
				message.error("更新失败");
			} finally {
				submitting.value = false;
			}
		}
	});
};

// 提交密码修改
const handlePasswordSubmit = async () => {
	if (!passwordFormRef.value) return;

	await passwordFormRef.value.validate(async (valid: boolean) => {
		if (valid) {
			passwordSubmitting.value = true;
			try {
				await userApi.updatePassword({
					oldPassword: passwordForm.oldPassword,
					newPassword: passwordForm.newPassword,
				});
				message.success("密码修改成功");
				// 清空表单
				passwordForm.oldPassword = "";
				passwordForm.newPassword = "";
				passwordForm.confirmPassword = "";
			} catch (error) {
				console.error("密码修改失败:", error);
				message.error("密码修改失败");
			} finally {
				passwordSubmitting.value = false;
			}
		}
	});
};
</script>

<style scoped></style>
