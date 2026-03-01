import axios from "axios";
import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { useUserStore, useLoadingStore } from "../stores";

// 创建 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
});

// 隐藏加载状态的辅助函数
function hideLoading() {
	const loadingStore = useLoadingStore();
	loadingStore.hide();
}

// 请求拦截器
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const userStore = useUserStore();
		const loadingStore = useLoadingStore();
		const token = userStore.token;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		// 显示加载状态
		loadingStore.show();
		return config;
	},
	(error: any) => {
		hideLoading();
		ElMessage.error("请求错误");
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		hideLoading();
		const { data } = response;
		// 检查是否是标准响应格式
		if (typeof data === "object" && data !== null && "code" in data) {
			if (data.code !== 200) {
				ElMessage.error(data.msg || "请求失败");
				return Promise.reject(data);
			}
			return data.data;
		}
		// 兼容旧格式
		return data;
	},
	(error: any) => {
		hideLoading();
		if (error.response) {
			console.error("响应错误:", error.response);
			const status = error.response.status;
			const message =
				error.response.data.msg || error.response.data.message || "请求失败";

			const errorMessages: Record<number, string> = {
				401: "未登录或登录已过期，请重新登录",
				403: "权限不足，无法执行此操作",
				404: "请求的资源不存在",
				500: "服务器内部错误，请稍后重试",
			};

			const errorMessage = errorMessages[status] || message;
			ElMessage.error(errorMessage);

			if (status === 401) {
				// 跳转到登录页
				const userStore = useUserStore();
				userStore.clearToken();
				window.location.href = "/login";
			}
		} else {
			ElMessage.error("网络错误");
		}
		return Promise.reject(error);
	}
);

// 封装请求方法
export const request = {
	get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return service.get(url, config);
	},
	post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return service.post(url, data, config);
	},
	put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return service.put(url, data, config);
	},
	patch<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return service.patch(url, data, config);
	},
	delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return service.delete(url, config);
	},
};

export default service;
