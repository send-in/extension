"use client"

// #region imports
import {
	ButtonHTMLAttributes,
	ReactNode,
	forwardRef
} from "react"

import {
	cn
} from "@/utils"
// #endregion


const buttonVariants = {
	base: `
		flex items-center justify-center gap-2 h-fit select-none
		rounded-full font-mada font-medium text-base desktop:text-xl normal-case
		smooth active:scale-98 focus:outline-none focus:ring-1 focus:ring-offset-2 shrink-0
		disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
	`,

	variants: {
        "blue-100": `
			bg-blue-100 hover:bg-blue-200 active:brightness-95
			text-white fill-white focus:ring-blue-300
		`,
        "charcoal-200": `
			bg-charcoal-100 hover:bg-charcoal-200 active:brightness-95
			text-white fill-white focus:ring-charcoal-300
		`,
        "purple-200": `
			bg-purple-200 hover:bg-purple-400 active:brightness-95
			text-white fill-white focus:ring-purple-400
		`,


		primary: `
			bg-blue-100 hover:bg-blue-200 active:brightness-95
			text-white fill-white focus:ring-blue-300
		`,

		secondary: `
			bg-charcoal-100 hover:bg-charcoal-200 active:brightness-95
			text-white fill-white focus:ring-charcoal-300
		`,

		danger: `
			bg-orange hover:bg-orange-700 active:brightness-95
			text-white fill-white focus:ring-orange-300
		`,

		neutral: `
			bg-grey-100 hover:brightness-85 active:brightness-95
			text-grey-300 fill-grey-300 focus:ring-grey-300
		`,

		ghost: `
			bg-transparent hover:bg-grey-100 active:bg-grey-150
			text-grey-200 fill-charcoal-100 focus:ring-white
		`,

		inverted: `
			bg-white hover:bg-blue-200 hover:text-white active:brightness-95
			text-blue-100 fill-white focus:ring-white group
		`
	},

	sizes: {
        xs: "px-2 py-1 text-sm min-w-[10%] ",
		sm: "px-4 py-2 text-sm min-w-[15%]",
		md: "px-6 py-2 min-w-[20%]",
		lg: "px-8 py-3 min-w-[25%]",
		xl: "px-8 py-3 min-w-[30%]",
		full: "px-6 py-2 w-full",
		auto: "px-6 py-2 w-fit",
	}
}

export interface ButtonProps
extends ButtonHTMLAttributes<
	HTMLButtonElement
> {
	variant?: keyof typeof buttonVariants.variants
	size?: keyof typeof buttonVariants.sizes
	disabled?: boolean
	loading?: boolean
	loadingText?: string

	startIcon?: ReactNode
	endIcon?: ReactNode

	children: ReactNode
	className?: string
	textClassName?: string

	fullWidth?: boolean

	onClick?: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			disabled = false,
			loading = false,
			loadingText = "Loading...",
			startIcon,
			endIcon,
			children,
			className = "",
			textClassName = "",
			fullWidth = false,
			onClick,
			...props
		},
		ref
	) => {

		const isDisabled = disabled || loading
		const displayText = loading ? loadingText : children

		const displayStartIcon = loading ? (
			<span
				className="loading loading-spinner loading-sm"
			/>
		) : startIcon

		const buttonClasses = cn(
			buttonVariants.base,
			buttonVariants.variants[variant],
			fullWidth ? buttonVariants.sizes.full : buttonVariants.sizes[size],
			className
		)

		const textClasses = cn(
			"flex-1 text-center",
			textClassName
		)


		const handleClick = (
			event: React.MouseEvent<HTMLButtonElement>
		) => {
			if (onClick && !isDisabled)
				onClick(event)
		}

		return (
			<button
				ref={ref}
				className={buttonClasses}
				disabled={isDisabled}
				onClick={handleClick}
				{...props}
			>

				{displayStartIcon && (
					<span
						className="flex-shrink-0"
					>
						{displayStartIcon}
					</span>
				)}

				<p
					className={textClasses}
				>
					{displayText}
				</p>

				{endIcon && !loading && (
					<span
						className="flex-shrink-0"
					>
						{endIcon}
					</span>
				)}
			</button>
		)
	}
)

Button.displayName = "Button"
export default Button
