<template>
	<div
		:class="[
			sidebarStore.collapsed ? 'w-16' : 'w-60',
			'transition-all duration-300 flex flex-col bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-r dark:border-gray-700',
		]"
	>
		<div
			class="h-15 flex items-center px-5 border-b border-gray-200 dark:border-b dark:border-gray-700"
		>
			<div
				:class="[
					'flex items-center gap-2.5 font-bold text-xl text-[#667eea]',
					{ 'gap-0': sidebarStore.collapsed },
				]"
			>
				<div
					v-if="systemStore.systemLogo"
					class="w-8 h-8 rounded overflow-hidden"
				>
					<img
						:src="systemStore.systemLogo"
						class="w-full h-full object-cover"
					/>
				</div>
				<div
					v-else
					class="w-8 h-8 rounded bg-[#667eea] text-white flex items-center justify-center text-base"
				>
					M
				</div>
				<span v-if="!sidebarStore.collapsed">{{
					systemStore.systemName || "Admin"
				}}</span>
			</div>
		</div>
		<el-menu
			:default-active="activeMenu"
			:collapse="sidebarStore.collapsed"
			:collapse-transition="true"
			:popup-mode="sidebarStore.collapsed ? 'hover' : 'click'"
			class="flex-1 border-r-0"
			@select="handleMenuSelect"
		>
			<!-- 动态渲染菜单 -->
			<template v-for="menu in permissionStore.menus" :key="menu.id">
				<!-- 系统管理特殊处理 -->
				<el-sub-menu v-if="menu.path === '/home/system'" :index="menu.id">
					<template #title>
						<el-icon>
							<component :is="menu.icon || 'Menu'" />
						</el-icon>
						<span v-if="!sidebarStore.collapsed">{{ menu.name }}</span>
					</template>
					<el-menu-item index="/home/system/system-info">
						<template #title>
							<el-icon><Setting /></el-icon>
							<span>系统信息</span>
						</template>
					</el-menu-item>
					<el-menu-item index="/home/system/menu">
						<template #title>
							<el-icon><Menu /></el-icon>
							<span>菜单管理</span>
						</template>
					</el-menu-item>
				</el-sub-menu>
				<!-- 其他有子菜单的情况 -->
				<el-sub-menu
					v-else-if="menu.children && menu.children.length > 0"
					:index="menu.id"
				>
					<template #title>
						<el-icon>
							<component :is="menu.icon || 'Menu'" />
						</el-icon>
						<span v-if="!sidebarStore.collapsed">{{ menu.name }}</span>
					</template>
					<el-menu-item
						v-for="childMenu in menu.children"
						:key="childMenu.id"
						:index="childMenu.path"
					>
						<template #title>
							<el-icon>
								<component :is="childMenu.icon || 'Menu'" />
							</el-icon>
							<span>{{ childMenu.name }}</span>
						</template>
					</el-menu-item>
				</el-sub-menu>
				<!-- 无子菜单的情况 -->
				<el-menu-item v-else :index="menu.path">
					<el-icon>
						<component :is="menu.icon || 'Menu'" />
					</el-icon>
					<template #title>
						<span v-if="!sidebarStore.collapsed">{{ menu.name }}</span>
					</template>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
	useSidebarStore,
	useTabsStore,
	useThemeStore,
	useUserStore,
	usePermissionStore,
	useSystemStore,
} from "../stores";

const router = useRouter();
const route = useRoute();
const sidebarStore = useSidebarStore();
const tabsStore = useTabsStore();
const themeStore = useThemeStore();
const userStore = useUserStore();
const permissionStore = usePermissionStore();
const systemStore = useSystemStore();

const activeMenu = computed(() => route.path);

// 加载权限数据
onMounted(async () => {
	if (!permissionStore.isLoaded) {
		await permissionStore.loadPermissions();
	}
	// 加载系统配置
	await systemStore.fetchSystemConfig();
});

const handleMenuSelect = (key: string) => {
	router.push(key);

	// 动态获取菜单名称
	let tabName = "";
	if (key === "/home" || key === "/home/dashboard") {
		tabName = "首页";
	} else if (key === "/home/user") {
		tabName = "用户管理";
	} else if (key === "/home/system") {
		tabName = "系统管理";
	} else if (key === "/home/system/system-info") {
		tabName = "系统信息";
	} else if (key === "/home/system/menu") {
		tabName = "菜单管理";
	} else if (key === "/home/project") {
		tabName = "项目管理";
	}

	if (tabName) {
		tabsStore.addTab({
			id: Date.now().toString(),
			name: tabName,
			path: key,
			fixed: key === "/home" || key === "/home/dashboard",
		});
	}
};
</script>
