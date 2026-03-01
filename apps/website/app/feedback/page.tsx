"use client";

import { CheckCircle, Send } from "lucide-react";
import { useState } from "react";

const Feedback = () => {
	const [formData, setFormData] = useState({
		type: "suggestion",
		content: "",
		contact: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		// 模拟提交过程
		setTimeout(() => {
			setLoading(false);
			setSubmitted(true);
			// 重置表单
			setFormData({
				type: "suggestion",
				content: "",
				contact: "",
			});
			// 3秒后重置提交状态
			setTimeout(() => {
				setSubmitted(false);
			}, 3000);
		}, 1000);
	};

	if (submitted) {
		return (
			<div className="container mx-auto px-4 py-12">
				<section className="max-w-2xl mx-auto text-center">
					<h1 className="text-4xl font-bold mb-4">反馈</h1>
					<div className="bg-green-50 p-8 rounded-lg border border-green-200">
						<CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
						<h2 className="text-2xl font-semibold mb-2">反馈提交成功！</h2>
						<p className="text-gray-600">
							感谢您的反馈，我们会认真考虑您的意见和建议。
						</p>
					</div>
				</section>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<section className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold mb-4">反馈</h1>
				<p className="text-xl text-gray-600 mb-8">
					请留下您的意见和建议，帮助我们改进产品和服务
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="type"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							反馈类型
						</label>
						<select
							id="type"
							name="type"
							value={formData.type}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							required
						>
							<option value="suggestion">建议</option>
							<option value="bug"> bug 报告</option>
							<option value="question">问题咨询</option>
							<option value="other">其他</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="content"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							反馈内容
						</label>
						<textarea
							id="content"
							name="content"
							value={formData.content}
							onChange={handleChange}
							rows={6}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							placeholder="请详细描述您的反馈..."
							required
						/>
					</div>

					<div>
						<label
							htmlFor="contact"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							联系方式（选填）
						</label>
						<input
							type="text"
							id="contact"
							name="contact"
							value={formData.contact}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							placeholder="请留下您的邮箱或手机号，以便我们回复您"
						/>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<title>加载中</title>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									提交中...
								</>
							) : (
								<>
									<Send className="mr-2" size={20} />
									提交反馈
								</>
							)}
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Feedback;
