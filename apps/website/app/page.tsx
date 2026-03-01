import { Code, ExternalLink, Layout, Package } from "lucide-react";
import Link from "next/link";

const Home = () => {
	return (
		<div className="container mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="mb-16 text-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					欢迎来到我的个人前端官网
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					展示我的前端开发技能和项目经验，包括CSS特效、UI组件和自研产品
				</p>
			</section>

			{/* Featured Sections */}
			<section className="mb-16">
				<h2 className="text-2xl font-bold mb-8">精选内容</h2>

				{/* CSS 特效 */}
				<div className="mb-12">
					<div className="flex items-center mb-4">
						<Code className="mr-2 text-blue-600" />
						<h3 className="text-xl font-semibold">精选 CSS 样式特效</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Link
							href="/css-effects"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Code size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">渐变按钮</h4>
								<p className="text-gray-600 mb-4">
									带有平滑过渡效果的彩色渐变按钮
								</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>

						<Link
							href="/css-effects"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Code size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">卡片悬停效果</h4>
								<p className="text-gray-600 mb-4">
									鼠标悬停时的卡片缩放和阴影效果
								</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>

						<Link
							href="/css-effects"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-amber-500 to-orange-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Code size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">加载动画</h4>
								<p className="text-gray-600 mb-4">流畅的CSS加载动画效果</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>
					</div>
					<div className="mt-4 text-center">
						<Link
							href="/css-effects"
							className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						>
							查看全部 CSS 特效
						</Link>
					</div>
				</div>

				{/* UI 组件 */}
				<div className="mb-12">
					<div className="flex items-center mb-4">
						<Layout className="mr-2 text-green-600" />
						<h3 className="text-xl font-semibold">精选 UI 组件</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Link
							href="/ui-components"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Layout size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">响应式导航栏</h4>
								<p className="text-gray-600 mb-4">
									适配各种屏幕尺寸的导航栏组件
								</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>

						<Link
							href="/ui-components"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Layout size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">卡片组件</h4>
								<p className="text-gray-600 mb-4">灵活的卡片布局组件</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>

						<Link
							href="/ui-components"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Layout size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">表单组件</h4>
								<p className="text-gray-600 mb-4">美观且功能齐全的表单元素</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>
					</div>
					<div className="mt-4 text-center">
						<Link
							href="/ui-components"
							className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
						>
							查看全部 UI 组件
						</Link>
					</div>
				</div>

				{/* 自研产品 */}
				<div>
					<div className="flex items-center mb-4">
						<Package className="mr-2 text-purple-600" />
						<h3 className="text-xl font-semibold">精选自研产品</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Link
							href="/products"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Package size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">前端工具库</h4>
								<p className="text-gray-600 mb-4">常用前端工具和函数集合</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>

						<Link
							href="/products"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-pink-500 to-red-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Package size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">响应式布局框架</h4>
								<p className="text-gray-600 mb-4">
									快速构建响应式网页的布局系统
								</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>

						<Link
							href="/products"
							className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="p-6">
								<div className="h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md mb-4 group-hover:opacity-90 transition-opacity flex items-center justify-center">
									<Package size={48} className="text-white" />
								</div>
								<h4 className="text-lg font-medium mb-2">图标库</h4>
								<p className="text-gray-600 mb-4">自定义图标集合</p>
								<div className="flex items-center text-blue-600 font-medium">
									查看详情
									<ExternalLink size={16} className="ml-2" />
								</div>
							</div>
						</Link>
					</div>
					<div className="mt-4 text-center">
						<Link
							href="/products"
							className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
						>
							查看全部产品
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
