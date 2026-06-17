interface InformationProps {
  size?: string | number
  color?: string
}

const Information = ({
	size = "1em", 
	color = "#9180F1" 
}: InformationProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle 
				cx="8" 
				cy="8" 
				r="7.25" 
				stroke={color} 
				strokeWidth="1.5" 
			/>
			<path
				d="M7.25455 12V6.23689H8.74545V12H7.25455ZM8 4.68069C7.70909 4.68069 7.46667 4.60807 7.27273 4.46282C7.09091 4.3072 7 4.09971 7 3.84035C7 3.59135 7.09091 3.38905 7.27273 3.23343C7.46667 3.07781 7.70909 3 8 3C8.29091 3 8.52727 3.07781 8.70909 3.23343C8.90303 3.38905 9 3.59135 9 3.84035C9 4.09971 8.90303 4.3072 8.70909 4.46282C8.52727 4.60807 8.29091 4.68069 8 4.68069Z"
				fill={color}
			/>
		</svg>
	)
}

export default Information
