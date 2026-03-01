import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 定义菜单路由类型
interface MenuItem {
	id: string;
	name: string;
	path: string;
	icon?: string;
	children?: MenuItem[];
	meta?: {
		requiresAuth?: boolean;
	};
}

// 定义权限类型
interface PermissionState {
	menus: MenuItem[];
	buttons: string[];
	isLoaded: boolean;
}

// Permission store
export const usePermissionStore = defineStore("permission", () => {
	const menus = ref<MenuItem[]>([]);
	const buttons = ref<string[]>([]);
	const isLoaded = ref(false);

	// 加载权限数据
	async function loadPermissions() {
		try {
			// 从后端获取权限数据
			const { permissionApi } = await import("@/api");
			const permissions = await permissionApi.getUserPermissions();

			menus.value = permissions.menus;
			buttons.value = permissions.buttons;
			isLoaded.value = true;

			// 保存到 localStorage，页面刷新不丢失
			localStorage.setItem(
				"permissions",
				JSON.stringify({
					menus: permissions.menus,
					buttons: permissions.buttons,
				})
			);
		} catch (error) {
			console.error("加载权限失败:", error);
			isLoaded.value = false;
		}
	}

	// 从 localStorage 恢复权限数据
	function restorePermissions() {
		const savedPermissions = localStorage.getItem("permissions");
		if (savedPermissions) {
			try {
				const { menus: savedMenus, buttons: savedButtons } =
					JSON.parse(savedPermissions);
				menus.value = savedMenus;
				buttons.value = savedButtons;
				isLoaded.value = true;
			} catch (error) {
				console.error("恢复权限数据失败:", error);
				isLoaded.value = false;
			}
		}
	}

	// 检查是否有权限
	function hasPermission(permission: string): boolean {
		return buttons.value.includes(permission);
	}

	// 检查是否有菜单权限
	function hasMenuPermission(path: string): boolean {
		// dashboard 路由固定都有权限
		if (path === "/home/dashboard") {
			return true;
		}

		// 个人信息路由固定都有权限
		if (path === "/home/profile") {
			return true;
		}

		// 系统管理相关路由固定都有权限
		if (
			path.startsWith("/home/system") ||
			path === "/home/system-info" ||
			path === "/home/menu-management"
		) {
			return true;
		}

		// 递归检查菜单路径
		function checkMenu(menuList: MenuItem[]): boolean {
			for (const menu of menuList) {
				if (menu.path === path) {
					return true;
				}
				if (menu.children && menu.children.length > 0) {
					if (checkMenu(menu.children)) {
						return true;
					}
				}
			}
			return false;
		}

		return checkMenu(menus.value);
	}

	// 清除权限数据
	function clearPermissions() {
		menus.value = [];
		buttons.value = [];
		isLoaded.value = false;
		localStorage.removeItem("permissions");
	}

	return {
		menus,
		buttons,
		isLoaded,
		loadPermissions,
		restorePermissions,
		hasPermission,
		hasMenuPermission,
		clearPermissions,
	};
});
