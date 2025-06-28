// 基本 Loading 組件
export default function Loading({ size = "md", color = "blue", text = "" }) {
	const sizeClasses: any = {
		sm: "w-4 h-4",
		md: "w-8 h-8",
		lg: "w-12 h-12",
		xl: "w-16 h-16",
	};

	const colorClasses: any = {
		blue: "border-blue-500",
		white: "border-white",
		gray: "border-gray-500",
		green: "border-green-500",
		red: "border-red-500",
	};

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<div
				className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-4 border-t-transparent 
          rounded-full 
          animate-spin
        `}
			/>
			{text && (
				<span
					className={`text-${color === "white" ? "white" : "gray-600"} text-sm font-medium`}
				>
					{text}
				</span>
			)}
		</div>
	);
}

// 全螢幕 Loading 組件
const FullScreenLoading = ({ text = "載入中..." }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 shadow-xl">
				<Loading size="lg" color="blue" text={text} />
			</div>
		</div>
	);
};

// 覆蓋容器的 Loading 組件
const OverlayLoading = ({ text = "載入中...", className = "" }) => {
	return (
		<div
			className={`absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center ${className}`}
		>
			<Loading size="md" color="blue" text={text} />
		</div>
	);
};

// 點狀 Loading 動畫
const DotsLoading = ({ color = "blue", text = "" }) => {
	const colorClasses: any = {
		blue: "bg-blue-500",
		white: "bg-white",
		gray: "bg-gray-500",
		green: "bg-green-500",
		red: "bg-red-500",
	};

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<div className="flex space-x-1">
				{[0, 1, 2].map((index) => (
					<div
						key={index}
						className={`
              w-2 h-2 
              ${colorClasses[color]} 
              rounded-full 
              animate-bounce
            `}
						style={{
							animationDelay: `${index * 0.2}s`,
							animationDuration: "1s",
						}}
					/>
				))}
			</div>
			{text && (
				<span
					className={`text-${color === "white" ? "white" : "gray-600"} text-sm font-medium`}
				>
					{text}
				</span>
			)}
		</div>
	);
};

// 骨架屏 Loading
const SkeletonLoading = () => {
	return (
		<div className="animate-pulse">
			<div className="grid grid-cols-4 gap-4">
				{[...Array(8)].map((_, index) => {
					const uniqueKey = `skeleton-item-${index}-${Math.random().toString(36).substr(2, 9)}`;
					return (
						<div key={uniqueKey} className="flex flex-col items-center">
							<div className="w-16 h-16 bg-gray-300 rounded-xl mb-2"></div>
							<div className="w-12 h-3 bg-gray-300 rounded"></div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export {
	Loading,
	FullScreenLoading,
	OverlayLoading,
	DotsLoading,
	SkeletonLoading,
};
