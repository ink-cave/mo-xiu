"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						墨岫技术
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						<Link
							href="/"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							首页
						</Link>
						<Link
							href="/css-effects"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							CSS 样式特效
						</Link>
						<Link
							href="/ui-components"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							UI 组件
						</Link>
						<Link
							href="/plugins"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							插件
						</Link>
						<Link
							href="/products"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							产品展示
						</Link>
						<Link
							href="/feedback"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							反馈
						</Link>
						<Link
							href="/about"
							className="text-gray-800 hover:text-blue-600 font-medium"
						>
							关于我
						</Link>
					</nav>

					{/* Mobile Navigation Toggle */}
					<button
						type="submit"
						onClick={toggleMenu}
						className="md:hidden text-gray-800 hover:text-blue-600"
						aria-label="Toggle menu"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation Menu */}
				{isOpen && (
					<nav className="md:hidden mt-4 pb-4">
						<div className="flex flex-col space-y-4">
							<Link
								href="/"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								首页
							</Link>
							<Link
								href="/css-effects"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								CSS 样式特效
							</Link>
							<Link
								href="/ui-components"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								UI 组件
							</Link>
							<Link
								href="/plugins"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								插件
							</Link>
							<Link
								href="/products"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								产品展示
							</Link>
							<Link
								href="/feedback"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								反馈
							</Link>
							<Link
								href="/about"
								className="text-gray-800 hover:text-blue-600 font-medium"
								onClick={toggleMenu}
							>
								关于我
							</Link>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Navbar;
