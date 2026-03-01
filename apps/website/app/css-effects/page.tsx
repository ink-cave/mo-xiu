import { Code, ExternalLink } from "lucide-react";
import Link from "next/link";

const CssEffects = () => {
	// 模拟 CSS 特效数据
	const effects = [
		{
			id: 1,
			title: "渐变按钮",
			description: "带有平滑过渡效果的彩色渐变按钮",
			color: "from-blue-500 to-purple-500",
			url: "/css-effects/gradient-button",
		},
		{
			id: 2,
			title: "卡片悬停效果",
			description: "鼠标悬停时的卡片缩放和阴影效果",
			color: "from-green-500 to-teal-500",
			url: "/css-effects/card-hover",
		},
		{
			id: 3,
			title: "加载动画",
			description: "流畅的CSS加载动画效果",
			color: "from-amber-500 to-orange-500",
			url: "/css-effects/loading-animation",
		},
		{
			id: 4,
			title: "文字动画",
			description: "动态文字效果，包括打字机和渐变",
			color: "from-pink-500 to-red-500",
			url: "/css-effects/text-animation",
		},
		{
			id: 5,
			title: "滚动效果",
			description: "平滑的滚动和视差效果",
			color: "from-indigo-500 to-blue-500",
			url: "/css-effects/scroll-effects",
		},
		{
			id: 6,
			title: "背景动画",
			description: "动态背景效果，包括渐变和粒子",
			color: "from-purple-500 to-pink-500",
			url: "/css-effects/background-animation",
		},
	];

	return (
		<div className="container mx-auto px-4 py-12">
			<section className="mb-16">
				<h1 className="text-4xl font-bold mb-4">CSS 样式特效</h1>
				<p className="text-xl text-gray-600">
					探索各种精心设计的 CSS 特效，包括按钮、卡片、动画等效果
				</p>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{effects.map((effect) => (
					<Link
						key={effect.id}
						href={effect.url}
						className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
					>
						<div
							className={`h-48 bg-gradient-to-r ${effect.color} flex items-center justify-center`}
						>
							<Code size={48} className="text-white" />
						</div>
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-2">{effect.title}</h3>
							<p className="text-gray-600 mb-4">{effect.description}</p>
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
			</section>
		</div>
	);
};

export default CssEffects;
