import { request } from "./request";

// 登录相关 API
export const loginApi = {
	// 登录
	login: (data: { username: string; password: string }) => {
		return request.post("/user/login", {
			username: data.username,
			password: data.password,
		});
	},
	// 登出
	logout: () => {
		return request.post("/user/logout");
	},
	// 获取用户信息
	getUserInfo: () => {
		return request.get("/user/me");
	},
};

// 项目相关 API
export const projectApi = {
	// 获取项目列表
	getProjectList: (params?: { page: number; size: number }) => {
		return request.get("/project/list", { params });
	},
	// 获取项目详情
	getProjectDetail: (id: number) => {
		return request.get(`/project/${id}`);
	},
	// 创建项目
	createProject: (data: any) => {
		return request.post("/project", data);
	},
	// 更新项目
	updateProject: (id: number, data: any) => {
		return request.patch(`/project/${id}`, data);
	},
	// 删除项目
	deleteProject: (id: number) => {
		return request.delete(`/project/${id}`);
	},
};

// 用户相关 API
export const userApi = {
	// 获取用户列表
	getUserList: (params?: { page: number; size: number }) => {
		return request.get("/user", { params });
	},
	// 创建用户（管理员）
	createUser: (data: any) => {
		return request.post("/user", data);
	},
	// 注册用户（公开）
	registerUser: (data: any) => {
		return request.post("/user/register", data);
	},
	// 更新用户
	updateUser: (id: number, data: any) => {
		return request.patch(`/user/${id}`, data);
	},
	// 修改密码
	updatePassword: (data: { oldPassword: string; newPassword: string }) => {
		return request.post("/user/change-password", data);
	},
	// 删除用户
	deleteUser: (id: number) => {
		return request.delete(`/user/${id}`);
	},
};

// 系统相关 API
export const systemApi = {
	// 获取系统配置
	getSystemConfig: () => {
		return request.get("/system/config");
	},
	// 更新系统配置
	updateSystemConfig: (data: any) => {
		return request.put("/system/config", data);
	},
	// 获取系统日志
	getSystemLog: (params?: { page: number; size: number }) => {
		return request.get("/system/log", { params });
	},
};

// 权限相关 API
export const permissionApi = {
	// 获取当前用户权限
	getUserPermissions: () => {
		return request.get("/permission/user");
	},
	// 获取所有权限
	getAllPermissions: () => {
		return request.get("/permission");
	},
	// 根据角色获取权限
	getPermissionsByRole: (role: string) => {
		return request.get(`/permission/role/${role}`);
	},
	// 创建权限
	createPermission: (data: any) => {
		return request.post("/permission", data);
	},
	// 更新权限
	updatePermission: (id: number, data: any) => {
		return request.put(`/permission/${id}`, data);
	},
	// 删除权限
	deletePermission: (id: number) => {
		return request.delete(`/permission/${id}`);
	},
	// 为角色分配权限
	assignPermissionToRole: (data: { role: string; permissionId: number }) => {
		return request.post("/permission/assign", data);
	},
	// 从角色中移除权限
	removePermissionFromRole: (data: { role: string; permissionId: number }) => {
		return request.post("/permission/remove", data);
	},
	// 初始化默认权限
	initializePermissions: () => {
		return request.post("/permission/initialize");
	},
};

// 菜单相关 API
export * from "./menu";
