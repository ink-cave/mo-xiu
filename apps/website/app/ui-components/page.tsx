import { ExternalLink, Layout } from "lucide-react";
import Link from "next/link";

const UiComponents = () => {
	// 模拟组件数据
	const components = {
		native: [
			{
				id: 1,
				title: "原生导航栏",
				description: "响应式原生 HTML/CSS 导航栏，适配各种屏幕尺寸",
				color: "from-blue-500 to-indigo-500",
				url: "/ui-components/native/navbar",
			},
			{
				id: 2,
				title: "原生卡片",
				description: "灵活的原生卡片布局组件，支持多种样式",
				color: "from-purple-500 to-pink-500",
				url: "/ui-components/native/card",
			},
			{
				id: 3,
				title: "原生表单",
				description: "美观且功能齐全的原生表单元素",
				color: "from-green-500 to-teal-500",
				url: "/ui-components/native/form",
			},
		],
		vue: [
			{
				id: 1,
				title: "Vue 导航栏",
				description: "基于 Vue 3 的响应式导航栏组件",
				color: "from-blue-500 to-indigo-500",
				url: "/ui-components/vue/navbar",
			},
			{
				id: 2,
				title: "Vue 卡片",
				description: "Vue 3 卡片组件，支持插槽和自定义样式",
				color: "from-purple-500 to-pink-500",
				url: "/ui-components/vue/card",
			},
			{
				id: 3,
				title: "Vue 表单",
				description: "Vue 3 表单组件，集成验证和错误处理",
				color: "from-green-500 to-teal-500",
				url: "/ui-components/vue/form",
			},
		],
		react: [
			{
				id: 1,
				title: "React 导航栏",
				description: "基于 React 的响应式导航栏组件",
				color: "from-blue-500 to-indigo-500",
				url: "/ui-components/react/navbar",
			},
			{
				id: 2,
				title: "React 卡片",
				description: "React 卡片组件，支持 props 和自定义渲染",
				color: "from-purple-500 to-pink-500",
				url: "/ui-components/react/card",
			},
			{
				id: 3,
				title: "React 表单",
				description: "React 表单组件，集成表单库和验证",
				color: "from-green-500 to-teal-500",
				url: "/ui-components/react/form",
			},
		],
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<section className="mb-16">
				<h1 className="text-4xl font-bold mb-4">UI 组件</h1>
				<p className="text-xl text-gray-600">
					浏览和使用各种前端 UI 组件，包括原生、Vue 和 React 组件
				</p>
			</section>

			{/* 原生组件 */}
			<section className="mb-16">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold">原生组件</h2>
					<Link
						href="/ui-components/native"
						className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
					>
						查看全部
						<ExternalLink size={16} className="ml-2" />
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{components.native.map((component) => (
						<Link
							key={component.id}
							href={component.url}
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
						>
							<div
								className={`h-48 bg-gradient-to-r ${component.color} flex items-center justify-center`}
							>
								<Layout size={48} className="text-white" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">
									{component.title}
								</h3>
								<p className="text-gray-600 mb-4">{component.description}</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink
										size={16}
										className="ml-2 group-hover:translate-x-1 transition-transform"
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Vue 组件 */}
			<section className="mb-16">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold">Vue 组件</h2>
					<Link
						href="/ui-components/vue"
						className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
					>
						查看全部
						<ExternalLink size={16} className="ml-2" />
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{components.vue.map((component) => (
						<Link
							key={component.id}
							href={component.url}
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
						>
							<div
								className={`h-48 bg-gradient-to-r ${component.color} flex items-center justify-center`}
							>
								<Layout size={48} className="text-white" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">
									{component.title}
								</h3>
								<p className="text-gray-600 mb-4">{component.description}</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink
										size={16}
										className="ml-2 group-hover:translate-x-1 transition-transform"
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* React 组件 */}
			<section>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold">React 组件</h2>
					<Link
						href="/ui-components/react"
						className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
					>
						查看全部
						<ExternalLink size={16} className="ml-2" />
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{components.react.map((component) => (
						<Link
							key={component.id}
							href={component.url}
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
						>
							<div
								className={`h-48 bg-gradient-to-r ${component.color} flex items-center justify-center`}
							>
								<Layout size={48} className="text-white" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">
									{component.title}
								</h3>
								<p className="text-gray-600 mb-4">{component.description}</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink
										size={16}
										className="ml-2 group-hover:translate-x-1 transition-transform"
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
};

export default UiComponents;
