import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gray-50 border-t border-gray-200 py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">我的作品集</h3>
						<p className="text-gray-600 mb-4">
							展示我的前端开发技能和项目经验，包括CSS特效、UI组件和产品展示。
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">导航</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/" className="text-gray-600 hover:text-blue-600">
									首页
								</Link>
							</li>
							<li>
								<Link
									href="/css-effects"
									className="text-gray-600 hover:text-blue-600"
								>
									CSS 样式特效
								</Link>
							</li>
							<li>
								<Link
									href="/ui-components"
									className="text-gray-600 hover:text-blue-600"
								>
									UI 组件
								</Link>
							</li>
							<li>
								<Link
									href="/products"
									className="text-gray-600 hover:text-blue-600"
								>
									产品展示
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">联系我</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/feedback"
									className="text-gray-600 hover:text-blue-600"
								>
									反馈
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-gray-600 hover:text-blue-600"
								>
									关于我
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
					<p>© 2026 我的作品集. 保留所有权利.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
