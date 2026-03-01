import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
	// 模拟产品数据
	const products = [
		{
			id: 1,
			title: "前端工具库",
			description: "常用前端工具和函数集合，提高开发效率",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Frontend%20toolkit%20with%20code%20and%20tools%20icons%20on%20dark%20background&image_size=landscape_4_3",
			url: "/products/frontend-toolkit",
		},
		{
			id: 2,
			title: "响应式布局框架",
			description: "快速构建响应式网页的布局系统，适配各种设备",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Responsive%20layout%20framework%20with%20mobile%20and%20desktop%20screens&image_size=landscape_4_3",
			url: "/products/responsive-layout",
		},
		{
			id: 3,
			title: "图标库",
			description: "自定义图标集合，为您的项目提供独特的视觉元素",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Icon%20library%20with%20various%20icons%20on%20grid&image_size=landscape_4_3",
			url: "/products/icon-library",
		},
		{
			id: 4,
			title: "UI 设计系统",
			description: "完整的 UI 设计系统，包含组件、样式和设计指南",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=UI%20design%20system%20with%20components%20and%20color%20palette&image_size=landscape_4_3",
			url: "/products/ui-design-system",
		},
		{
			id: 5,
			title: "性能优化工具",
			description: "前端性能分析和优化工具，提升网站加载速度",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Performance%20optimization%20tools%20with%20speed%20metrics%20and%20charts&image_size=landscape_4_3",
			url: "/products/performance-tools",
		},
		{
			id: 6,
			title: "动画库",
			description: "流畅的前端动画库，为您的网站添加生动的视觉效果",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Animation%20library%20with%20motion%20effects%20and%20keyframes&image_size=landscape_4_3",
			url: "/products/animation-library",
		},
	];

	return (
		<div className="container mx-auto px-4 py-12">
			<section className="mb-16">
				<h1 className="text-4xl font-bold mb-4">产品展示</h1>
				<p className="text-xl text-gray-600">
					探索我们开发的前端工具和产品，提升您的开发效率
				</p>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{products.map((product) => (
					<Link
						key={product.id}
						href={product.url}
						className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
					>
						<div className="aspect-video overflow-hidden relative">
							<Image
								src={product.image}
								alt={product.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-2">{product.title}</h3>
							<p className="text-gray-600 mb-4">{product.description}</p>
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

export default Products;
