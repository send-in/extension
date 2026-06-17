"use client"

// #region imports
import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode
} from "react"

import {
	cn
} from "@/utils"
// #endregion

const iconButtonVariants = {
	base: `
		inline-flex items-center justify-center rounded-full
		smooth active:scale-98 focus:outline-none focus:ring-2
        ring-white desktop:scale-120 cursor-pointer disabled:opacity-50 
        disabled:cursor-not-allowed [&>svg]:pointer-events-none 
	`,
	variants: {
		primary: `
			[&>svg]:fill-blue-100
			active:ring-blue-100
		`,
		secondary: `
			[&>svg]:fill-charcoal-100
			active:ring-charcoal-100
		`,
		danger: `
			[&>svg]:fill-orange
			active:ring-orange
		`,
		neutral: `
			[&>svg]:fill-grey-200 bg-grey-100
			active:ring-grey-200
		`,
		ghost: `
			[&>svg]:fill-charcoal-100
			active:ring-grey-200
		`,
		transparent: `
			[&>svg]:fill-white
			active:ring-transparent
			focus:ring-transparent
		`,
	},
	sizes: {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-12 h-12",
	},
}


export interface IconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof iconButtonVariants.variants
	size?: keyof typeof iconButtonVariants.sizes
	disabled?: boolean
	children: ReactNode
	className?: string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			disabled = false,
			children,
			className,
			...props
		},
		ref
	) => {

	const buttonClasses = cn(
		iconButtonVariants.base,
		iconButtonVariants.variants[variant],
		iconButtonVariants.sizes[size],
		className
	)

	return (
		<button
			ref={ref}
			className={buttonClasses}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	)
	}
)

IconButton.displayName = "IconButton"
export default IconButton
