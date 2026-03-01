import { createApp } from "vue";
import "./global.css";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { setupPermissionDirective } from "./utils/permission";

// 按需导入Element Plus图标
import {
	Expand,
	Fold,
	Moon,
	Sunny,
	Monitor,
	ArrowDown,
	ArrowLeft,
	Close,
	ArrowRight,
	Menu,
	Setting,
	House,
	User,
	Briefcase,
	Lock,
	UserFilled,
} from "@element-plus/icons-vue";

const app = createApp(App);

// 注册使用的图标
const icons = {
	Expand,
	Fold,
	Moon,
	Sunny,
	Monitor,
	ArrowDown,
	ArrowLeft,
	Close,
	ArrowRight,
	Menu,
	Setting,
	House,
	User,
	Briefcase,
	Lock,
	UserFilled,
};

// 批量注册图标
Object.entries(icons).forEach(([name, component]) => {
	app.component(name, component);
});

app.use(ElementPlus);
app.use(router);
app.use(createPinia());

// 注册权限指令
setupPermissionDirective(app);

// 配置暗黑模式
const isDark = localStorage.getItem("dark") === "true";
if (isDark) {
	document.documentElement.classList.add("dark");
	document.documentElement.setAttribute("data-theme", "dark");
}

app.mount("#app");
