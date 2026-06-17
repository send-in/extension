interface GoToProps {
	size?: number | string
	color?: string
	className?: string
}

const GoTo = ({
	size = 30,
	color = "white",
	className
}: GoToProps) => {
	return (
		<svg
			className={className + "smooth rounded-full flex justify-center items-center p-2"}
			width={size}
			height={size}
			viewBox="0 0 52 52"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8H38.36L2.82 43.54C1.26256 45.0974 1.26256 47.6226 2.82 49.18C4.37744 50.7374 6.90256 50.7374 8.46 49.18L44 13.64V44C44 46.2091 45.7909 48 48 48C50.2091 48 52 46.2091 52 44V7C52 3.13401 48.866 0 45 0H8Z"
				className={`fill-${color}`}
			/>
		</svg>

	)
}

export default GoTo
