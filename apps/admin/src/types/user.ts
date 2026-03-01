// 用户角色枚举（与后端保持一致）
export enum UserRole {
	SUPER_ADMIN = "super_admin",
	ADMIN = "admin",
	TEST = "test",
	DEVELOPER = "developer",
	OTHER = "other",
}

// 用户状态枚举（与后端保持一致）
export enum UserStatus {
	ACTIVE = "active",
	DISABLED = "disabled",
}
