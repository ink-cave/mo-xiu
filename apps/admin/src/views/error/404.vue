<template>
	<div class="error-container">
		<div class="error-content">
			<el-result
				icon="warning"
				title="404"
				sub-title="抱歉，您访问的页面不存在"
			>
				<template #extra>
					<el-button type="primary" @click="goHome">返回首页</el-button>
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
