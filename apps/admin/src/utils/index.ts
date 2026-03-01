import { ElMessage, ElMessageBox } from "element-plus";

// 日期格式化
export const formatDate = (
	date: string | Date,
	format: string = "YYYY-MM-DD HH:mm:ss"
): string => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	const hours = String(d.getHours()).padStart(2, "0");
	const minutes = String(d.getMinutes()).padStart(2, "0");
	const seconds = String(d.getSeconds()).padStart(2, "0");

	return format
		.replace("YYYY", String(year))
		.replace("MM", month)
		.replace("DD", day)
		.replace("HH", hours)
		.replace("mm", minutes)
		.replace("ss", seconds);
};

// 消息提示
export const message = {
	success: (message: string) => {
		ElMessage.success(message);
	},
	error: (message: string) => {
		ElMessage.error(message);
	},
	warning: (message: string) => {
		ElMessage.warning(message);
	},
	info: (message: string) => {
		ElMessage.info(message);
	},
};

// 确认对话框
export const confirm = {
	delete: (message: string = "确定要删除吗？") => {
		return ElMessageBox.confirm(message, "警告", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		});
	},
	custom: (
		message: string,
		title: string = "确认",
		type: "success" | "warning" | "info" | "error" = "warning"
	) => {
		return ElMessageBox.confirm(message, title, {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type,
		});
	},
};

// 生成唯一ID
export const generateId = (): string => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 深度克隆
export const deepClone = <T>(obj: T): T => {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	if (obj instanceof Date) {
		return new Date(obj.getTime()) as any;
	}
	if (obj instanceof Array) {
		return obj.map((item) => deepClone(item)) as any;
	}
	if (typeof obj === "object") {
		const clonedObj: any = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				clonedObj[key] = deepClone(obj[key]);
			}
		}
		return clonedObj;
	}
	return obj;
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	wait: number
): ((...args: Parameters<T>) => void) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
	func: T,
	wait: number
): ((...args: Parameters<T>) => void) => {
	let lastTime = 0;
	return (...args: Parameters<T>) => {
		const now = Date.now();
		if (now - lastTime >= wait) {
			func(...args);
			lastTime = now;
		}
	};
};
