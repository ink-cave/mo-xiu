import { Code, Heart, Layout, Package } from "lucide-react";

const About = () => {
	const skills = [
		{
			category: "前端开发",
			items: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"TypeScript",
				"React",
				"Next.js",
				"Vue.js",
				"Tailwind CSS",
				"Sass",
			],
		},
		{
			category: "后端开发",
			items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "RESTful APIs"],
		},
		{
			category: "工具与流程",
			items: [
				"Git",
				"GitHub",
				"Webpack",
				"Vite",
				"ESLint",
				"Prettier",
				"CI/CD",
			],
		},
		{
			category: "设计与UI",
			items: ["Figma", "Adobe XD", "响应式设计", "无障碍设计", "用户体验设计"],
		},
	];

	return (
		<div className="container mx-auto px-4 py-12">
			<section className="mb-16">
				<h1 className="text-4xl font-bold mb-4">关于我</h1>
				<p className="text-xl text-gray-600">
					前端开发者，专注于创建美观、高效的用户界面和交互体验
				</p>
			</section>

			{/* 个人介绍 */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6">个人介绍</h2>
				<div className="bg-white p-8 rounded-lg shadow-md">
					<p className="text-gray-800 mb-4">
						你好！我是一名前端开发者，拥有多年的前端开发经验，专注于创建美观、响应式的网页应用。我热爱前端技术，不断学习和探索新的技术栈和开发方式。
					</p>
					<p className="text-gray-800 mb-4">
						我擅长使用现代前端框架和工具，如React、Next.js、Vue.js等，以及CSS预处理器和框架如Tailwind
						CSS、Sass等。我注重代码质量和用户体验，致力于创建既美观又高效的前端应用。
					</p>
					<p className="text-gray-800">
						除了前端开发，我也有后端开发经验，能够构建完整的全栈应用。我喜欢解决复杂的技术问题，并且善于与团队合作，共同完成项目目标。
					</p>
				</div>
			</section>

			{/* 技术栈 */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6">技术栈</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{skills.map((skill) => (
						<div
							key={skill.category}
							className="bg-white p-6 rounded-lg shadow-md"
						>
							<h3 className="text-lg font-semibold mb-4">{skill.category}</h3>
							<div className="flex flex-wrap gap-2">
								{skill.items.map((item) => (
									<span
										key={item}
										className="px-3 py-1 bg-gray-100 rounded-full text-gray-800 text-sm"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* 作品集说明 */}
			<section>
				<h2 className="text-2xl font-semibold mb-6">作品集说明</h2>
				<div className="bg-white p-8 rounded-lg shadow-md">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="flex flex-col items-center text-center">
							<Code size={48} className="text-blue-600 mb-4" />
							<h3 className="text-lg font-semibold mb-2">CSS 样式特效</h3>
							<p className="text-gray-600">
								各种精心设计的CSS特效，包括按钮、卡片、动画等效果
							</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<Layout size={48} className="text-green-600 mb-4" />
							<h3 className="text-lg font-semibold mb-2">UI 组件</h3>
							<p className="text-gray-600">
								分类展示原生、Vue和React组件，提供实时演示和使用方法
							</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<Package size={48} className="text-purple-600 mb-4" />
							<h3 className="text-lg font-semibold mb-2">产品展示</h3>
							<p className="text-gray-600">
								展示自研的前端工具和产品，包括功能说明和使用教程
							</p>
						</div>
					</div>
					<p className="text-gray-800 text-center">
						这个作品集网站展示了我的前端开发技能和项目经验，希望能为你提供一些灵感和参考。
						如果你有任何问题或合作意向，欢迎通过反馈页面与我联系。
					</p>
				</div>
			</section>

			{/* 页脚 */}
			<section className="mt-16 text-center">
				<p className="text-gray-600 flex items-center justify-center">
					<Heart size={16} className="text-red-500 mr-2" />
					感谢您的访问！
				</p>
			</section>
		</div>
	);
};

export default About;
