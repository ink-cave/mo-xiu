import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from "vue-router";
import { useUserStore, usePermissionStore } from "../stores";

// 路由配置
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/login/Login.vue"),
		meta: { requiresAuth: false },
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("../views/home/Home.vue"),
		meta: { requiresAuth: true },
		children: [
			{
				path: "",
				redirect: "/home/dashboard",
			},
			{
				path: "dashboard",
				name: "Dashboard",
				component: () => import("../views/home/Dashboard.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "user",
				name: "User",
				component: () => import("../views/user/UserList.vue"),
				meta: { requiresAuth: true, requiresAdmin: true },
			},
			{
				path: "project",
				name: "Project",
				component: () => import("../views/project/ProjectList.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "system",
				name: "System",
				component: () => import("../views/system/System.vue"),
				meta: { requiresAuth: true, requiresAdmin: true },
				children: [
					{
						path: "",
						redirect: "system-info",
					},
					{
						path: "system-info",
						name: "SystemInfo",
						component: () => import("../views/system/SystemInfo.vue"),
						meta: { requiresAuth: true, requiresAdmin: true },
					},
					{
						path: "menu",
						name: "MenuManagement",
						component: () => import("../views/system/MenuManagement.vue"),
						meta: { requiresAuth: true, requiresAdmin: true },
					},
				],
			},
			{
				path: "profile",
				name: "Profile",
				component: () => import("../views/profile/Profile.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "permission",
				name: "Permission",
				component: () => import("../views/permission/PermissionList.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "role-permission",
				name: "RolePermission",
				component: () => import("../views/permission/RolePermission.vue"),
				meta: { requiresAuth: true },
			},
		],
	},
	// 404 页面
	{
		path: "/404",
		name: "404",
		component: () => import("../views/error/404.vue"),
	},
	// 500 页面
	{
		path: "/500",
		name: "500",
		component: () => import("../views/error/500.vue"),
	},
	// 捕获所有未匹配的路由，重定向到 404 页面
	{
		path: "/:pathMatch(.*)*",
		redirect: "/404",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore();
	const permissionStore = usePermissionStore();

	// 检查是否需要认证
	if (to.meta.requiresAuth !== false) {
		// 如果没有token，重定向到登录页
		if (!userStore.token) {
			next("/login");
			return;
		}

		// 如果有token但没有用户信息，获取用户信息
		if (!userStore.userInfo) {
			await userStore.fetchUserInfo();

			// 如果获取用户信息失败（可能token过期），重定向到登录页
			if (!userStore.token) {
				next("/login");
				return;
			}
		}

		// 加载权限数据
		if (!permissionStore.isLoaded) {
			await permissionStore.loadPermissions();
		}

		// 检查是否有权限访问目标路由
		if (to.path !== "/home" && to.path !== "/home/dashboard") {
			if (!permissionStore.hasMenuPermission(to.path)) {
				next("/home");
				return;
			}
		}
	}

	next();
});

export default router;
