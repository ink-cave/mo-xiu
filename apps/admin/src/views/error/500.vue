<template>
	<div class="error-container">
		<div class="error-content">
			<el-result icon="error" title="500" sub-title="抱歉，服务器内部出错了">
				<template #extra>
					<el-button type="primary" @click="goHome">返回首页</el-button>
					<el-button @click="refreshPage">刷新页面</el-button>
				</template>
			</el-result>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
	router.push("/home");
};

const refreshPage = () => {
	window.location.reload();
};
</script>

<style scoped>
.error-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f5f7fa;
}

.error-content {
	width: 100%;
	max-width: 600px;
	padding: 40px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
