import { SVGProps } from "react"

export interface ChevronProps extends SVGProps<SVGSVGElement> {
	direction?: "left" | "right"
	size?: number
}

const Chevron = ({
	direction = "right",
	size = 16,
	...props
}: ChevronProps) => {
	const rotation = direction === "left" ? "rotate(180 12 12)" : undefined

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			{...props}
		>
			<g transform={rotation}>
				<path d="M9.29 6.71a1 1 0 0 1 1.42 0L15 11l-4.29 4.29a1 1 0 1 1-1.42-1.42L12.17 11 9.29 8.12a1 1 0 0 1 0-1.41z" />
			</g>
		</svg>
  )
}

export default Chevron
