interface ArrowProps {
	size?: number | string
	direction?: "up" | "down"
	active?: boolean
	color?: string
}

const Arrow = ({
	size = 20,
	direction = "down",
	active = true,
	color = "white",
}: ArrowProps) => {
	const rotateClass = direction === "up" ? "rotate-180" : "rotate-0"
	const strokeColor = active ? color : "#A0C2F9"

	return (
		<svg
			width={size}
			height={Math.floor((size as number) * 0.6)}
			viewBox="0 0 20 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`smooth ${rotateClass}`}
		>
			<path
				d="M19 1.00008L10.4146 10.2281C10.0088 10.6644 9.31378 10.6511 8.92486 10.1997L0.999999 1.00008"
				stroke={strokeColor}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</svg>
	)
}

export default Arrow
