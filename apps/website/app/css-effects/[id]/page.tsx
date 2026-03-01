"use client";

import { Check, ChevronLeft, Copy } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface Props {
	params: {
		id: string;
	};
}

const CssEffectDetail = ({ params: { id } }: Props) => {
	const [copied, setCopied] = useState(false);
	const codeRef = useRef<HTMLPreElement>(null);

	// 模拟特效数据
	const effectData = {
		"gradient-button": {
			title: "渐变按钮",
			description:
				"带有平滑过渡效果的彩色渐变按钮，可用于突出显示主要操作按钮。",
			usage: "适用于需要吸引用户注意的按钮，如提交表单、购买或注册按钮。",
			code: `.gradient-button {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.gradient-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`,
			preview: true,
		},
		"card-hover": {
			title: "卡片悬停效果",
			description: "鼠标悬停时的卡片缩放和阴影效果，增强用户交互体验。",
			usage: "适用于产品卡片、博客文章预览或任何需要突出显示的内容块。",
			code: `.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}`,
			preview: true,
		},
		"loading-animation": {
			title: "加载动画",
			description: "流畅的CSS加载动画效果，为用户提供视觉反馈。",
			usage: "适用于页面加载、数据处理或任何需要等待的操作。",
			code: `.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
			preview: true,
		},
		"text-animation": {
			title: "文字动画",
			description: "动态文字效果，包括打字机和渐变效果。",
			usage: "适用于标题、标语或需要强调的文本内容。",
			code: `.typewriter {
  overflow: hidden;
  border-right: 0.15em solid #3b82f6;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: 
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #3b82f6; }
}`,
			preview: true,
		},
		"scroll-effects": {
			title: "滚动效果",
			description: "平滑的滚动和视差效果，增强页面的深度感。",
			usage: "适用于长页面、产品展示或任何需要视觉深度的场景。",
			code: `.parallax {
  background-image: url('your-image.jpg');
  height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}`,
			preview: false,
		},
		"background-animation": {
			title: "背景动画",
			description: "动态背景效果，包括渐变和粒子效果。",
			usage: "适用于登录页面、英雄区域或任何需要视觉吸引力的部分。",
			code: `.animated-bg {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
			preview: false,
		},
	};

	const effect = effectData[id as keyof typeof effectData] || {
		title: "特效未找到",
		description: "抱歉，未找到该特效的详细信息。",
		usage: "",
		code: "",
		preview: false,
	};

	const handleCopyCode = () => {
		if (codeRef.current) {
			navigator.clipboard
				.writeText(effect.code)
				.catch((err) => console.error("Failed to copy code:", err));
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="mb-8">
				<Link
					href="/css-effects"
					className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
				>
					<ChevronLeft className="mr-2" size={20} />
					返回所有特效
				</Link>
			</div>

			<section className="mb-12">
				<h1 className="text-4xl font-bold mb-4">{effect.title}</h1>
				<p className="text-xl text-gray-600 mb-8">{effect.description}</p>
			</section>

			{/* 预览区域 */}
			{effect.preview && (
				<section className="mb-12 p-8 bg-gray-50 rounded-lg">
					<h2 className="text-2xl font-semibold mb-4">实时预览</h2>
					<div className="flex flex-col items-center justify-center">
						{id === "gradient-button" && (
							<button type="button" className="gradient-button">
								点击我
							</button>
						)}
						{id === "card-hover" && (
							<div className="card max-w-sm w-full">
								<h3 className="text-xl font-semibold mb-2">卡片标题</h3>
								<p className="text-gray-600">
									这是一张带有悬停效果的卡片，鼠标悬停时会有缩放和阴影变化。
								</p>
							</div>
						)}
						{id === "loading-animation" && (
							<div className="loading-spinner"></div>
						)}
						{id === "text-animation" && (
							<h2 className="typewriter">这是打字机效果的文字动画</h2>
						)}
					</div>
				</section>
			)}

			{/* 代码区域 */}
			<section className="mb-12">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-semibold">CSS 代码</h2>
					<button
						type="button"
						onClick={handleCopyCode}
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						{copied ? (
							<>
								<Check className="mr-2" size={16} />
								已复制
							</>
						) : (
							<>
								<Copy className="mr-2" size={16} />
								复制代码
							</>
						)}
					</button>
				</div>
				<pre
					ref={codeRef}
					className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto"
				>
					<code>{effect.code}</code>
				</pre>
			</section>

			{/* 使用说明 */}
			{effect.usage && (
				<section>
					<h2 className="text-2xl font-semibold mb-4">使用说明</h2>
					<p className="text-gray-600">{effect.usage}</p>
				</section>
			)}

			<style jsx global>{`
				.gradient-button {
					background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
					color: white;
					border: none;
					padding: 12px 24px;
					border-radius: 8px;
					font-size: 16px;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s ease;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
				}

				.gradient-button:hover {
					transform: translateY(-2px);
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
				}

				.gradient-button:active {
					transform: translateY(0);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
				}

				.card {
					background: white;
					border-radius: 8px;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
					padding: 24px;
					transition: all 0.3s ease;
					cursor: pointer;
				}

				.card:hover {
					transform: translateY(-5px) scale(1.02);
					box-shadow:
						0 20px 25px -5px rgba(0, 0, 0, 0.1),
						0 10px 10px -5px rgba(0, 0, 0, 0.04);
				}

				.loading-spinner {
					width: 40px;
					height: 40px;
					border: 4px solid #f3f3f3;
					border-top: 4px solid #3b82f6;
					border-radius: 50%;
					animation: spin 1s linear infinite;
				}

				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}

				.typewriter {
					overflow: hidden;
					border-right: 0.15em solid #3b82f6;
					white-space: nowrap;
					margin: 0 auto;
					letter-spacing: 0.15em;
					animation:
						typing 3.5s steps(40, end),
						blink-caret 0.75s step-end infinite;
				}

				@keyframes typing {
					from {
						width: 0;
					}
					to {
						width: 100%;
					}
				}

				@keyframes blink-caret {
					from,
					to {
						border-color: transparent;
					}
					50% {
						border-color: #3b82f6;
					}
				}
			`}</style>
		</div>
	);
};

export default CssEffectDetail;
