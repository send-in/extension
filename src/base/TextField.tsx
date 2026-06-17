"use client"

// #region imports
import {
	InputHTMLAttributes,
	ReactNode,
	forwardRef
} from "react"

import { cn } from "@/utils"
// #endregion


const textFieldVariants = {
	base: `
		font-main px-6 py-1 rounded-lg
		font-normal text-base desktop:text-xl h-fit 
        text-base desktop:text-xl
		smooth disabled:opacity-50 
        disabled:cursor-not-allowed
	`,
	variants: {
		standard: `
			bg-transparent border-none border-grey-100 rounded-none
			focus-within:ring-none text-grey-300 focus:outline-none
		`,
		filled: `
			bg-grey-100 
			focus-within:bg-white
			focus-within:ring-2 
            focus-within:ring-blue-500 
            focus-within:ring-inset
		`,
		outlined: `
			bg-white border border-grey-100
			focus-within:border-blue-500
			focus-within:ring-2 focus-within:ring-blue-500 
            focus-within:ring-inset
		`
	},
	sizes: {
		sm: "text-sm py-1 px-3!",
		md: "text-base desktop:text-xl py-2 px-3",
		lg: "text-lg py-3 px-4"
	},
	colors: {
		default: "text-charcoal-100",
		disabled: "text-grey-300",
		error: "text-error",
		success: "text-green-500"
	}
}

export interface ITextFieldProps
extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	variant?: keyof typeof textFieldVariants.variants
	size?: keyof typeof textFieldVariants.sizes
	disabled?: boolean
	fullWidth?: boolean
    error?: boolean

	color?: keyof typeof textFieldVariants.colors

	label?: string
	helperText?: ReactNode
	startIcon?: ReactNode
	endIcon?: ReactNode

	slotProps?: {
		input?: {
			disableUnderline?: boolean
			className?: string
		}
	}

	className?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
	(
		{
			variant = "outlined",
			size = "md",
			disabled = false,
			fullWidth = false,
            error = false,
			label,
			helperText,
			startIcon,
			endIcon,
			slotProps,
			className = "",
			...props
		},
		ref
	) => {

		const wrapperClasses = cn(
			"flex flex-col gap-1 relative",
			textFieldVariants.base,
			textFieldVariants.variants[variant],
			textFieldVariants.sizes[size],
			fullWidth && "w-full",
			label && "mt-4",
            error && "ring-error ring-1 ring-inset",
			className
		)

		const inputClasses = cn(
			"flex-1 bg-transparent outline-none",
			slotProps?.input?.disableUnderline && "border-none",
			slotProps?.input?.className
		)

		return (
			<div
                className={wrapperClasses}
                data-error={error}
            >
				{label && (
					<label
						className="
                            text-sm text-grey-200 font-medium
                            absolute -top-6 left-0
                        "
					>
						{label}
					</label>
				)}

				<div
					className="flex items-center"
				>
					{startIcon && (
						<span className="shrink-0">
                            {startIcon}
                        </span>
					)}

					<input
						ref={ref}
						className={inputClasses}
						disabled={disabled}
						{...props}
					/>

					{endIcon && (
						<span className="shrink-0">
							{endIcon}
						</span>
					)}
				</div>

				{helperText && (
                    <label
                        className={cn(
                            "text-xs font-medium absolute -top-6 right-0",
							
                            error ?
							"text-error animate-fade-in-fast" :
							"text-grey-200"
                        )}
                    >
                        {helperText}
                    </label>
                )}
			</div>
		)
	}
)

TextField.displayName = "TextField"
export default TextField
