"use client"

// #region imports
import {
	forwardRef,
	InputHTMLAttributes,
	ReactNode,
} from "react"

import { cn, toDateTimeLocal } from "@/utils"
// #endregion

const dateTimeVariants = {
	base: `
		input border-none
		bg-blue-100 text-white
		fill-white font-mada smooth
		rounded-full

        hover:outline-none
		hover:ring-2 hover:ring-blue-300

		focus:outline-none
		focus:ring-2 focus:ring-blue-300

		disabled:opacity-50
		disabled:cursor-not-allowed
	`,

	sizes: {
		sm: "input-sm",
		md: "",
		lg: "input-lg",
		full: "w-full",
	},
}

export interface DateTimeFieldProps
extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "size" | "value" | "onChange"
> {
    value?: string
    onChange?: (value: string) => void
	inputSize?: keyof typeof dateTimeVariants.sizes
	fullWidth?: boolean
	startIcon?: ReactNode
	className?: string
}

const DateTimeField = forwardRef<
	HTMLInputElement,
	DateTimeFieldProps
>(
	(
		{
            value,
            onChange,
			inputSize = "md",
			fullWidth = false,
			startIcon,
			className = "",
			...props
		},
		ref,
	) => {

		const inputClasses = cn(
			dateTimeVariants.base,
			fullWidth
				? dateTimeVariants.sizes.full
				: dateTimeVariants.sizes[inputSize],
			className,
		)

		return (
			<label
				className={cn(
					`
                        flex items-center gap-3
                        cursor-pointer w-fit group
					`,
                    inputClasses,
					fullWidth && "w-full",
				)}
			>
				{
					startIcon &&
					<span>
						{startIcon}
					</span>
				}

				<input
                    {...props}
					ref={ref}
					type="datetime-local"
                    value={value}
                    onChange={
                        (e) =>onChange?.(
                            e.target.value,
                        )
                    }
				/>
			</label>
		)
	},
)

DateTimeField.displayName =
	"DateTimeField"

export default DateTimeField