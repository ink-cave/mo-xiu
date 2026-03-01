import request from "./request";

export const menuApi = {
	getMenuTree: () => request.get("/menu/tree"),
	getMenuList: () => request.get("/menu"),
	getMenuById: (id: number) => request.get(`/menu/${id}`),
	createMenu: (data: any) => request.post("/menu", data),
	updateMenu: (id: number, data: any) => request.patch(`/menu/${id}`, data),
	deleteMenu: (id: number) => request.delete(`/menu/${id}`),
};
