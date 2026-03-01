import { Package } from "lucide-react";

const Plugins = () => {
	return (
		<div className="container mx-auto px-4 py-12">
			<section className="mb-16 text-center">
				<h1 className="text-4xl font-bold mb-4">插件</h1>
				<p className="text-xl text-gray-600 mb-8">
					探索各种前端插件，提升开发效率和用户体验
				</p>

				<div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 rounded-xl p-8">
					<Package size={80} className="text-gray-400 mb-6" />
					<h2 className="text-2xl font-semibold mb-4">插件功能开发中</h2>
					<p className="text-gray-600 max-w-2xl">
						我们正在开发一系列有用的前端插件，敬请期待。
					</p>
				</div>
			</section>
		</div>
	);
};

export default Plugins;
