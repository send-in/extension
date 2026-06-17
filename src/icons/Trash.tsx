import { cn } from "@/utils"

interface TrashProps {
	size?: string | number
    className?: string
}

const Trash = ({ size = 18, className }: TrashProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 12 15"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
                `
                    transition-colors smooth
                    group-hover:fill-white
                `, 
                className
            )}
		>
			<path
				d="M0.857143 13.3333C0.857143 14.25 1.62857 15 2.57143 15H9.42857C10.3714 15 11.1429 14.25 11.1429 13.3333V5C11.1429 4.08333 10.3714 3.33333 9.42857 3.33333H2.57143C1.62857 3.33333 0.857143 4.08333 0.857143 5V13.3333ZM11.1429 0.833333H9L8.39143 0.241667C8.23714 0.0916666 8.01429 0 7.79143 0H4.20857C3.98571 0 3.76286 0.0916666 3.60857 0.241667L3 0.833333H0.857143C0.385714 0.833333 0 1.20833 0 1.66667C0 2.125 0.385714 2.5 0.857143 2.5H11.1429C11.6143 2.5 12 2.125 12 1.66667C12 1.20833 11.6143 0.833333 11.1429 0.833333Z"
			/>
		</svg>
	)
}

export default Trash
