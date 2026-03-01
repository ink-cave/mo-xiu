<template>
	<div class="flex h-screen w-screen overflow-hidden">
		<div
			class="hidden md:flex flex-1 bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white p-5 transition-all duration-300"
		>
			<div class="flex flex-col items-center gap-5">
				<div
					class="w-20 h-20 rounded-full bg-white text-[#667eea] flex items-center justify-center text-5xl font-bold"
				>
					M
				</div>
				<div class="text-center">
					<h1 class="text-4xl font-bold mb-2">Admin</h1>
					<p class="text-xl opacity-90">后台管理系统</p>
				</div>
			</div>
		</div>
		<div
			class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900"
		>
			<div
				class="w-11/12 max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-gray-700"
			>
				<h2 class="text-center mb-8 text-gray-800 dark:text-white">
					{{ isRegister ? "注册" : "登录" }}
				</h2>
				<el-form
					v-if="!isRegister"
					ref="loginFormRef"
					:model="loginForm"
					label-width="80px"
				>
					<el-form-item
						label="用户名"
						prop="username"
						:rules="[
							{
								required: true,
								message: '用户名或邮箱不能为空',
								trigger: 'blur',
							},
						]"
					>
						<el-input
							v-model="loginForm.username"
							placeholder="请输入用户名或邮箱"
						/>
					</el-form-item>
					<el-form-item
						label="密码"
						prop="password"
						:rules="[
							{ required: true, message: '密码不能为空', trigger: 'blur' },
						]"
					>
						<el-input
							v-model="loginForm.password"
							type="password"
							placeholder="请输入密码"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="w-full text-base" @click="login"
							>登录</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button class="w-full text-base" @click="isRegister = true"
							>注册账号</el-button
						>
					</el-form-item>
				</el-form>
				<el-form
					v-else
					ref="registerFormRef"
					:model="registerForm"
					label-width="80px"
				>
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
						<el-input
							v-model="registerForm.username"
							placeholder="请输入用户名"
						/>
					</el-form-item>
					<el-form-item
						label="邮箱"
						prop="email"
						:rules="[
							{ required: true, message: '邮箱不能为空', trigger: 'blur' },
							{
								type: 'email',
								message: '请输入有效的邮箱地址',
								trigger: 'blur',
							},
							{
								max: 100,
								message: '邮箱长度不能超过100个字符',
								trigger: 'blur',
							},
						]"
					>
						<el-input v-model="registerForm.email" placeholder="请输入邮箱" />
					</el-form-item>
					<el-form-item
						label="密码"
						prop="password"
						:rules="[
							{ required: true, message: '密码不能为空', trigger: 'blur' },
							{
								min: 6,
								max: 100,
								message: '密码长度不能少于6个字符且不能超过100个字符',
								trigger: 'blur',
							},
						]"
					>
						<el-input
							v-model="registerForm.password"
							type="password"
							placeholder="请输入密码"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="w-full text-base" @click="register"
							>注册</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button class="w-full text-base" @click="isRegister = false"
							>返回登录</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { loginApi, userApi } from "@/api";
import { useUserStore, useThemeStore } from "@/stores";

const router = useRouter();
const userStore = useUserStore();
const themeStore = useThemeStore();

const isRegister = ref(false);

const loginFormRef = ref();
const registerFormRef = ref();

const loginForm = ref({
	username: "",
	password: "",
});

const login = async () => {
	if (!loginFormRef.value) return;

	try {
		await loginFormRef.value.validate();
		const res = await loginApi.login(loginForm.value);
		userStore.setToken(res.token);
		userStore.setUserInfo(res.user);
		ElMessage.success("登录成功");
		router.push("/home");
	} catch (error) {
		if (error === false) {
			// 表单验证失败，Element Plus 会自动显示错误信息
			return;
		}
		// 服务端验证不通过时，不显示失败提示，只在控制台打印错误
		console.error(error);
	}
};

const registerForm = ref({
	username: "",
	email: "",
	password: "",
	role: "other", // 默认角色为other
});

const register = async () => {
	if (!registerFormRef.value) return;

	try {
		await registerFormRef.value.validate();
		await userApi.registerUser(registerForm.value);
		ElMessage.success("注册成功");
		isRegister.value = false;
	} catch (error) {
		if (error === false) {
			// 表单验证失败，Element Plus 会自动显示错误信息
			return;
		}
		// 服务端验证不通过时，不显示失败提示，只在控制台打印错误
		console.error(error);
	}
};

// 在组件挂载时检查主题状态
onMounted(() => {
	// 确保根元素的 dark 类与主题状态同步
	if (themeStore.dark) {
		document.documentElement.classList.add("dark");
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		document.documentElement.classList.remove("dark");
		document.documentElement.setAttribute("data-theme", "light");
	}
});
</script>
