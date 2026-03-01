import { defineStore } from "pinia";
import { ref } from "vue";

// User store
export const useUserStore = defineStore("user", () => {
	const token = ref(localStorage.getItem("token") || "");
	const userInfo = ref<any>(null);
	const isFetchingUserInfo = ref(false);

	function setToken(newToken: string) {
		token.value = newToken;
		localStorage.setItem("token", newToken);
	}

	function clearToken() {
		token.value = "";
		userInfo.value = null;
		localStorage.removeItem("token");
	}

	function setUserInfo(info: any) {
		userInfo.value = info;
	}

	// 获取用户信息
	async function fetchUserInfo() {
		// 如果没有token或者正在获取，直接返回
		if (!token.value || isFetchingUserInfo.value) return;

		isFetchingUserInfo.value = true;

		try {
			const { loginApi } = await import("@/api");
			const user = await loginApi.getUserInfo();
			if (user) {
				userInfo.value = user;
			} else {
				// 如果返回的用户信息为null，清除token
				console.error("获取用户信息失败: 返回的用户信息为null");
				clearToken();
			}
		} catch (error) {
			console.error("获取用户信息失败:", error);
			// 如果获取失败，清除token
			clearToken();
		} finally {
			isFetchingUserInfo.value = false;
		}
	}

	return {
		token,
		userInfo,
		isFetchingUserInfo,
		setToken,
		clearToken,
		setUserInfo,
		fetchUserInfo,
	};
});
