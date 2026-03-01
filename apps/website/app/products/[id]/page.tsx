import {
	BookOpen,
	CheckCircle,
	ChevronLeft,
	Code,
	Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
	params: {
		id: string;
	};
}

const ProductDetail = ({ params: { id } }: Props) => {
	// 模拟产品详情数据
	const productData = {
		"frontend-toolkit": {
			title: "前端工具库",
			description: "常用前端工具和函数集合，提高开发效率",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Frontend%20toolkit%20with%20code%20and%20tools%20icons%20on%20dark%20background&image_size=landscape_16_9",
			features: [
				"常用工具函数集合",
				"表单验证和处理",
				"日期和时间处理",
				"DOM 操作工具",
				"网络请求封装",
				"数据格式化工具",
			],
			tutorial:
				"1. 安装：npm install frontend-toolkit\n2. 导入：import { formatDate, validateEmail } from 'frontend-toolkit'\n3. 使用：const formattedDate = formatDate(new Date())\n4. 查看文档了解更多功能",
			code: "// 示例：使用日期格式化工具\nimport { formatDate } from 'frontend-toolkit';\n\nconst date = new Date();\nconst formattedDate = formatDate(date, 'YYYY-MM-DD');\nconsole.log(formattedDate); // 输出：2026-02-25",
			download: "https://example.com/downloads/frontend-toolkit.zip",
		},
		"responsive-layout": {
			title: "响应式布局框架",
			description: "快速构建响应式网页的布局系统，适配各种设备",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Responsive%20layout%20framework%20with%20mobile%20and%20desktop%20screens&image_size=landscape_16_9",
			features: [
				"响应式网格系统",
				"灵活的断点设置",
				"移动优先设计",
				"自定义间距和边距",
				"组件布局预设",
				"深色模式支持",
			],
			tutorial:
				"1. 安装：npm install responsive-layout\n2. 导入：import { Container, Row, Col } from 'responsive-layout'\n3. 使用：<Container><Row><Col md={6}>Content</Col></Row></Container>\n4. 查看文档了解更多布局选项",
			code: "// 示例：使用响应式网格\nimport { Container, Row, Col } from 'responsive-layout';\n\nfunction App() {\n  return (\n    <Container>\n      <Row>\n        <Col sm={12} md={6} lg={4}>\n          <div>Column 1</div>\n        </Col>\n        <Col sm={12} md={6} lg={4}>\n          <div>Column 2</div>\n        </Col>\n        <Col sm={12} md={12} lg={4}>\n          <div>Column 3</div>\n        </Col>\n      </Row>\n    </Container>\n  );\n}",
			download: "https://example.com/downloads/responsive-layout.zip",
		},
		"icon-library": {
			title: "图标库",
			description: "自定义图标集合，为您的项目提供独特的视觉元素",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Icon%20library%20with%20various%20icons%20on%20grid&image_size=landscape_16_9",
			features: [
				"多种图标风格",
				"可自定义颜色和大小",
				"支持 SVG 和字体图标",
				"响应式图标",
				"易于集成到任何项目",
				"定期更新新图标",
			],
			tutorial:
				"1. 安装：npm install icon-library\n2. 导入：import { Home, Search, User } from 'icon-library'\n3. 使用：<Home size={24} color='blue' />\n4. 查看文档了解所有可用图标",
			code: "// 示例：使用图标\nimport { Home, Search, User } from 'icon-library';\n\nfunction Navbar() {\n  return (\n    <nav>\n      <ul>\n        <li><Home size={24} /> Home</li>\n        <li><Search size={24} /> Search</li>\n        <li><User size={24} /> Profile</li>\n      </ul>\n    </nav>\n  );\n}",
			download: "https://example.com/downloads/icon-library.zip",
		},
		"ui-design-system": {
			title: "UI 设计系统",
			description: "完整的 UI 设计系统，包含组件、样式和设计指南",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=UI%20design%20system%20with%20components%20and%20color%20palette&image_size=landscape_16_9",
			features: [
				"完整的组件库",
				"一致的设计语言",
				"可定制的主题",
				"响应式设计",
				"无障碍支持",
				"详细的设计指南",
			],
			tutorial:
				"1. 安装：npm install ui-design-system\n2. 导入样式：import 'ui-design-system/dist/styles.css'\n3. 使用组件：import { Button, Card, Input } from 'ui-design-system'\n4. 查看文档了解所有组件和用法",
			code: "// 示例：使用 UI 组件\nimport { Button, Card, Input } from 'ui-design-system';\n\nfunction Form() {\n  return (\n    <Card>\n      <h2>Contact Form</h2>\n      <Input placeholder='Name' />\n      <Input placeholder='Email' type='email' />\n      <Button variant='primary'>Submit</Button>\n    </Card>\n  );\n}",
			download: "https://example.com/downloads/ui-design-system.zip",
		},
		"performance-tools": {
			title: "性能优化工具",
			description: "前端性能分析和优化工具，提升网站加载速度",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Performance%20optimization%20tools%20with%20speed%20metrics%20and%20charts&image_size=landscape_16_9",
			features: [
				"性能分析工具",
				"代码分割优化",
				"图片压缩和优化",
				"缓存策略管理",
				"资源预加载",
				"性能指标监控",
			],
			tutorial:
				"1. 安装：npm install performance-tools\n2. 导入：import { analyzePerformance, optimizeImages } from 'performance-tools'\n3. 使用：analyzePerformance()\n4. 查看报告并应用优化建议",
			code: "// 示例：分析性能\nimport { analyzePerformance } from 'performance-tools';\n\n// 分析当前页面性能\nconst performanceData = await analyzePerformance();\nconsole.log('Performance metrics:', performanceData);\n\n// 优化图片\noptimizeImages('images/');",
			download: "https://example.com/downloads/performance-tools.zip",
		},
		"animation-library": {
			title: "动画库",
			description: "流畅的前端动画库，为您的网站添加生动的视觉效果",
			image:
				"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Animation%20library%20with%20motion%20effects%20and%20keyframes&image_size=landscape_16_9",
			features: [
				"多种预设动画",
				"自定义动画创建",
				"缓动函数支持",
				"动画序列和时间线",
				"硬件加速",
				"响应式动画",
			],
			tutorial:
				"1. 安装：npm install animation-library\n2. 导入：import { animate, fadeIn, slideIn } from 'animation-library'\n3. 使用：animate(element, { opacity: 1 }, 1000)\n4. 查看文档了解所有可用动画",
			code: "// 示例：使用动画\nimport { animate, fadeIn, slideIn } from 'animation-library';\n\n// 淡入效果\nfadeIn(element, 1000);\n\n// 自定义动画\nanimate(element, {\n  x: 100,\n  y: 50,\n  opacity: 1\n}, 1000, 'ease-out');",
			download: "https://example.com/downloads/animation-library.zip",
		},
	};

	const product = productData[id as keyof typeof productData] || {
		title: "产品未找到",
		description: "抱歉，未找到该产品的详细信息。",
		image: "",
		features: [],
		tutorial: "",
		code: "",
		download: "",
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="mb-8">
				<Link
					href="/products"
					className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
				>
					<ChevronLeft className="mr-2" size={20} />
					返回所有产品
				</Link>
			</div>

			<section className="mb-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="aspect-video rounded-lg overflow-hidden shadow-lg relative">
						<Image
							src={product.image}
							alt={product.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					<div>
						<h1 className="text-4xl font-bold mb-4">{product.title}</h1>
						<p className="text-xl text-gray-600 mb-8">{product.description}</p>
						<a
							href={product.download}
							className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
							download
						>
							<Download className="mr-2" size={20} />
							下载产品
						</a>
					</div>
				</div>
			</section>

			{/* 功能说明 */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6">功能说明</h2>
				<ul className="space-y-4">
					{product.features.map((feature, index) => (
						<li
							key={`feature-${index}-${feature.substring(0, 10)}`}
							className="flex items-start"
						>
							<CheckCircle
								className="text-green-600 mr-3 mt-1 flex-shrink-0"
								size={20}
							/>
							<span className="text-gray-800">{feature}</span>
						</li>
					))}
				</ul>
			</section>

			{/* 使用教程 */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 flex items-center">
					<BookOpen className="mr-2" size={24} />
					使用教程
				</h2>
				<div className="bg-gray-50 p-6 rounded-lg">
					<pre className="whitespace-pre-wrap text-gray-800">
						{product.tutorial}
					</pre>
				</div>
			</section>

			{/* 代码示例 */}
			<section>
				<h2 className="text-2xl font-semibold mb-6 flex items-center">
					<Code className="mr-2" size={24} />
					代码示例
				</h2>
				<pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
					<code>{product.code}</code>
				</pre>
			</section>
		</div>
	);
};

export default ProductDetail;
