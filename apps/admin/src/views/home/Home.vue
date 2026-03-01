<template>
	<div class="flex h-screen w-screen overflow-hidden">
		<!-- 侧边栏 -->
		<SidebarMenu />

		<!-- 主内容区 -->
		<div
			class="flex-1 flex flex-col overflow-hidden transition-all duration-300"
		>
			<!-- 顶部导航栏 -->
			<div
				class="h-15 flex items-center justify-between px-5 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-b dark:border-gray-700"
			>
				<div class="flex items-center gap-4">
					<div @click="sidebarStore.toggle" class="cursor-pointer">
						<el-icon size="24" v-if="sidebarStore.collapsed"
							><Expand
						/></el-icon>
						<el-icon size="24" v-else><Fold /></el-icon>
					</div>
					<el-breadcrumb separator="/" class="flex-1">
						<el-breadcrumb-item :to="{ path: '/home' }"
							>首页</el-breadcrumb-item
						>
						<el-breadcrumb-item
							v-if="breadcrumbItems.length > 0"
							v-for="(item, index) in breadcrumbItems"
							:key="index"
							:to="{ path: item.path }"
						>
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="flex items-center gap-2.5">
					<el-button
						@click="themeStore.toggle"
						:icon="themeStore.dark ? 'Moon' : 'Sunny'"
						circle
					/>
					<el-button @click="toggleFullscreen" icon="Monitor" circle />
					<el-dropdown>
						<el-button type="text">
							<el-avatar size="small">U</el-avatar>
							<span class="mx-2">用户</span>
							<el-icon class="el-icon--right"><ArrowDown /></el-icon>
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="goToProfile"
									>个人信息</el-dropdown-item
								>
								<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>

			<!-- Tab 标签页 -->
			<div
				class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center h-10 overflow-hidden">
					<el-button
						v-if="showTabLeftArrow"
						class="h-10 border-0 border-r bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
						@click="scrollTabs('left')"
						icon="ArrowLeft"
					/>
					<div
						class="flex-1 flex overflow-x-auto scrollbar-hide"
						ref="tabsScrollRef"
					>
						<div
							v-for="tab in tabsStore.tabs"
							:key="tab.id"
							:class="[
								'px-4 h-10 flex items-center gap-2 cursor-pointer border-b-2 border-transparent text-gray-900 dark:text-gray-100',
								{
									'text-[#667eea] border-b-[#667eea]':
										tabsStore.activeTab === tab.path,
								},
							]"
							@click="switchTab(tab.path)"
						>
							{{ tab.name }}
							<el-button
								v-if="!tab.fixed"
								class="p-0 w-5 h-5"
								@click.stop="removeTab(tab.path)"
								icon="Close"
								size="small"
							/>
						</div>
					</div>
					<el-button
						v-if="showTabRightArrow"
						class="h-10 border-0 border-r bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
						@click="scrollTabs('right')"
						icon="ArrowRight"
					/>
				</div>
			</div>

			<!-- 内容区域 -->
			<div class="flex-1 overflow-auto p-5 bg-gray-50 dark:bg-gray-800">
				<router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
	useSidebarStore,
	useTabsStore,
	useThemeStore,
	useUserStore,
	usePermissionStore,
} from "../../stores";

import { ElMessage } from "element-plus";
import SidebarMenu from "../../components/SidebarMenu.vue";

const router = useRouter();
const route = useRoute();
const sidebarStore = useSidebarStore();
const tabsStore = useTabsStore();
const themeStore = useThemeStore();
const userStore = useUserStore();
const permissionStore = usePermissionStore();

const breadcrumbItems = computed(() => {
	const path = route.path;
	const breadcrumbMap: Record<string, { name: string; path: string }[]> = {
		"/home": [],
		"/home/dashboard": [],
		"/home/user": [
			{ name: "用户管理", path: "/home/user" },
			{ name: "用户列表", path: "/home/user" },
		],
		"/home/system": [{ name: "系统管理", path: "/home/system" }],
		"/home/system/system-info": [
			{ name: "系统管理", path: "/home/system" },
			{ name: "系统信息", path: "/home/system/system-info" },
		],
		"/home/system/menu": [
			{ name: "系统管理", path: "/home/system" },
			{ name: "菜单管理", path: "/home/system/menu" },
		],
		"/home/project": [
			{ name: "项目管理", path: "/home/project" },
			{ name: "项目列表", path: "/home/project" },
		],
		"/home/profile": [{ name: "个人信息", path: "/home/profile" }],
		"/home/permission": [{ name: "权限管理", path: "/home/permission" }],
		"/home/role-permission": [
			{ name: "角色权限", path: "/home/role-permission" },
		],
	};
	return breadcrumbMap[path] || [];
});

const showTabLeftArrow = ref(false);
const showTabRightArrow = ref(false);
const tabsScrollRef = ref<HTMLElement>();

const switchTab = (path: string) => {
	router.push(path);
	tabsStore.setActiveTab(path);
};

const removeTab = (path: string) => {
	tabsStore.removeTab(path);
	// 确保路由与当前激活的 tab 一致
	if (router.currentRoute.value.path !== tabsStore.activeTab) {
		router.push(tabsStore.activeTab);
	}
};

const scrollTabs = (direction: "left" | "right") => {
	if (tabsScrollRef.value) {
		const scrollAmount = direction === "left" ? -200 : 200;
		tabsScrollRef.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
	}
};

const toggleFullscreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
};

// 退出登录
const logout = () => {
	userStore.clearToken();
	permissionStore.clearPermissions();
	tabsStore.clearTabs();
	ElMessage.success("退出登录成功");
	router.push("/login");
};

// 跳转到个人信息页面
const goToProfile = () => {
	router.push("/home/profile");
	tabsStore.addTab({
		id: Date.now().toString(),
		name: "个人信息",
		path: "/home/profile",
		fixed: false,
	});
};

const checkTabArrows = () => {
	if (tabsScrollRef.value) {
		const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.value;
		showTabLeftArrow.value = scrollLeft > 0;
		showTabRightArrow.value = scrollLeft < scrollWidth - clientWidth;
	}
};

watch(() => tabsStore.tabs, checkTabArrows, { deep: true });

// 监听路由变化，自动添加标签页
watch(
	() => route.path,
	(newPath) => {
		// 只处理需要认证的页面
		if (newPath !== "/home" && newPath !== "/home/dashboard") {
			const items = breadcrumbItems.value;
			if (items.length > 0) {
				// 使用面包屑最后一级作为标签页名称
				const lastItem = items[items.length - 1];
				tabsStore.addTab({
					id: Date.now().toString(),
					name: lastItem.name,
					path: newPath,
					fixed: false,
				});
			}
		}
	}
);

onMounted(async () => {
	window.addEventListener("resize", checkTabArrows);
	checkTabArrows();
	// 页面加载时获取用户信息，确保登录状态和权限正确
	await userStore.fetchUserInfo();
	// 加载权限数据
	if (!permissionStore.isLoaded) {
		await permissionStore.loadPermissions();
	}
	// 初始加载时添加当前页面的标签页
	const items = breadcrumbItems.value;
	if (items.length > 0) {
		const lastItem = items[items.length - 1];
		tabsStore.addTab({
			id: Date.now().toString(),
			name: lastItem.name,
			path: route.path,
			fixed: false,
		});
	}
});
</script>

<style scoped>
/* 保留过渡动画样式 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
	display: none;
}

.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
