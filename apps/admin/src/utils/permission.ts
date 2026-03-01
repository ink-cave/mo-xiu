import type { App } from "vue";
import { usePermissionStore } from "../stores";

// 权限指令
export function setupPermissionDirective(app: App) {
	app.directive("permission", {
		mounted(el: HTMLElement, binding: { value: string }) {
			const permissionStore = usePermissionStore();
			const permission = binding.value;

			if (permission && !permissionStore.hasPermission(permission)) {
				// 没有权限，隐藏元素
				el.style.display = "none";
			}
		},
		updated(el: HTMLElement, binding: { value: string }) {
			const permissionStore = usePermissionStore();
			const permission = binding.value;

			if (permission && !permissionStore.hasPermission(permission)) {
				el.style.display = "none";
			} else {
				el.style.display = "";
			}
		},
	});
}
