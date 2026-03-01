<template>
	<div class="system-info">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			<el-card>
				<template #header>
					<div class="flex justify-between items-center">
						<span>系统信息</span>
					</div>
				</template>
				<div class="py-5">
					<el-descriptions :column="2">
						<el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
						<el-descriptions-item label="运行环境"
							>生产环境</el-descriptions-item
						>
						<el-descriptions-item label="最后更新"
							>2024-01-01</el-descriptions-item
						>
						<el-descriptions-item label="服务器状态">正常</el-descriptions-item>
					</el-descriptions>
				</div>
			</el-card>

			<el-card>
				<template #header>
					<div class="flex justify-between items-center">
						<span>系统配置</span>
					</div>
				</template>
				<div class="py-5">
					<el-form :model="configForm" label-width="120px">
						<el-form-item label="系统名称">
							<el-input
								v-model="configForm.systemName"
								:disabled="!isSuperAdmin"
							/>
						</el-form-item>
						<el-form-item label="系统Logo">
							<el-upload
								class="upload-demo"
								action="/api/system/upload"
								:headers="{ Authorization: `Bearer ${userStore.token}` }"
								:show-file-list="false"
								:on-success="handleLogoUpload"
								:disabled="!isSuperAdmin"
							>
								<template v-if="configForm.systemLogo">
									<img
										:src="configForm.systemLogo"
										class="w-20 h-20 object-cover rounded cursor-pointer"
									/>
								</template>
								<template v-else>
									<el-button type="primary">上传Logo</el-button>
								</template>
							</el-upload>
						</el-form-item>
						<el-form-item label="是否开启验证码">
							<el-switch
								v-model="configForm.captchaEnabled"
								:disabled="!isSuperAdmin"
							/>
						</el-form-item>
						<el-form-item label=" session 超时时间">
							<el-input-number
								v-model="configForm.sessionTimeout"
								:min="1"
								:max="24"
								:disabled="!isSuperAdmin"
							/>
							<span class="ml-2.5 text-gray-400">小时</span>
						</el-form-item>
						<el-form-item>
							<el-button v-if="isSuperAdmin" type="primary" @click="saveConfig"
								>保存配置</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore, useSystemStore } from "@/stores";
import { systemApi } from "@/api";
import { ElMessage } from "element-plus";
import { UserRole } from "@/types/user";

const userStore = useUserStore();
const systemStore = useSystemStore();

// 检查是否为超级管理员
const isSuperAdmin = computed(() => {
	return userStore.userInfo?.role === UserRole.SUPER_ADMIN;
});

const configForm = ref({
	systemName: "后台管理系统",
	systemLogo: "",
	captchaEnabled: true,
	sessionTimeout: 24,
});

// 获取系统配置
const getSystemConfig = async () => {
	try {
		const config = await systemApi.getSystemConfig();
		configForm.value = config;
	} catch (error) {
		console.error("获取系统配置失败:", error);
	}
};

// 处理Logo上传成功
const handleLogoUpload = (response: any) => {
	if (response.url) {
		configForm.value.systemLogo = response.url;
		ElMessage.success("Logo上传成功");
	} else {
		ElMessage.error("Logo上传失败");
	}
};

// 保存系统配置
const saveConfig = async () => {
	try {
		const updatedConfig = await systemApi.updateSystemConfig(configForm.value);
		systemStore.updateSystemConfig(updatedConfig);
		ElMessage.success("配置保存成功");
	} catch (error) {
		console.error("保存系统配置失败:", error);
		ElMessage.error("保存配置失败");
	}
};

// 页面挂载时获取系统配置
onMounted(async () => {
	await getSystemConfig();
});
</script>

<style scoped>
.system-info {
	padding: 20px;
}
</style>
