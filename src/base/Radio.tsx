"use client"

// #region imports
import {
	forwardRef,
	InputHTMLAttributes,
	ReactNode
} from "react"

import {
	cn
} from "@/utils"
// #endregion

const radioVariants = {
	base: `
		radio smooth border-2 border-grey-300 checked:text-blue-100
		checked:bg-white-100 checked:border-blue-200
		disabled:opacity-50 disabled:cursor-not-allowed
		hover:bg-bluewash
	`,
	sizes: {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	}
}

export interface RadioProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: ReactNode
	size?: keyof typeof radioVariants.sizes
	className?: string
	labelClassName?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			label,
			size = "md",
			className = "",
			labelClassName = "",
			...props
		},
		ref
	) => {
		const radioClasses = cn(
			radioVariants.base,
			radioVariants.sizes[size],
			className
		)

		const labelClasses = cn(
			"font-mada whitespace-nowrap text-grey-300 font-medium flex items-center gap-2 cursor-pointer",
			labelClassName
		)

		return label ? (
			<label className={labelClasses}>
				<input
					ref={ref}
					type="radio"
					className={radioClasses}
					{...props}
				/>
				<span>{label}</span>
			</label>
		) : (
			<input
				ref={ref}
				type="radio"
				className={radioClasses}
				{...props}
			/>
		)
	}
)

Radio.displayName = "Radio"
export default Radio
