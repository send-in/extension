"use client"

// #region imports
import {
	forwardRef,
	isValidElement,
	ReactElement,
	ReactNode,
	Ref,
	useState,
	useEffect
} from "react"

import { cn } from "@/utils"
// #endregion

export interface SelectOption {
	label: string
	value: string
	disabled?: boolean
}

export interface SelectProps<T> {
    name?: string
	options?: T[]
	selected?: T
	placeholder?: string
	disabled?: boolean
	size?: "sm" | "md" | "lg"
	variant?: "primary" | "neutral"
	className?: string
    dropdownClassName?: string
	buttonClassName?: string
	onChange?: (value: T) => void
}

const sizeClasses = {
	sm: "text-sm px-3 py-0!",
	md: "text-base desktop:text-xl px-4",
	lg: "text-lg px-5",
}

const variantClasses = {
	primary: "bg-blue-100 text-white hover:bg-blue-200 focus:ring-blue-100",
	neutral: "bg-grey-100 text-grey-300 hover:bg-bluewash focus:ring-grey-200",
}

const isObject = (val: any): val is { label: string } =>
	val && typeof val === "object" && "label" in val

const Select = <T extends string | SelectOption | ReactNode>(
	{
        name,
		options,
		selected,
		placeholder,
		size = "md",
		disabled,
		variant = "primary",
		className = "",
		buttonClassName = "",
        dropdownClassName = "",
		onChange
	}: SelectProps<T>,
	ref: Ref<HTMLDivElement>
) => {

	const [internalSelected, setInternalSelected] = useState<T | undefined>(selected)

	useEffect(() => {
        setInternalSelected(selected)
	}, [selected])

	const handleSelect = (opt: T) => {
		setInternalSelected(opt)
		onChange?.(opt)
	}

    const hiddenValue = (() => {
        if (!internalSelected) {
            return ""
        }

        if (isObject(internalSelected)) {
            return internalSelected.value
        }

        if (typeof internalSelected === "string") {
            return internalSelected
        }

        return ""
    })()

	const selectedOption = options?.find(opt =>
		isObject(opt) && isObject(internalSelected)
			? opt.label === internalSelected.label
			: opt === internalSelected
	)

	const wrapperClasses = cn("dropdown", className)

	const buttonClasses = cn(
		`
			btn rounded-full font-medium smooth delay-50! min-w-26
			border-none focus:ring-2 focus:ring-inset 
            focus:ring-blue-100 flex justify-between
		`,
		sizeClasses[size],
		selectedOption
			? variantClasses[variant]
			: "bg-white text-grey-300 hover:bg-grey-100",
		buttonClassName
	)

	return (
		<div ref={ref} className={wrapperClasses}>
            {
                name &&
                <input
                    type="hidden"
                    name={name}
                    value={hiddenValue}
                />
            }

			<button
				type="button"
				tabIndex={0}
				className={buttonClasses}
				disabled={disabled}
			>
				<span
					className="text-ellipsis truncate"
				>
					{isObject(selectedOption)
						? selectedOption?.label
						: selectedOption || (placeholder || "Select")}
				</span>
				<span className="ml-2">&#9662;</span>
			</button>

			<ul
				tabIndex={0}
				className={cn(`
                        dropdown-content p-2 mt-2 w-72 shadow rounded-xl bg-white
                        space-y-1 max-h-[40vh] overflow-y-scroll relative z-50
                    `,  
                    dropdownClassName
                )}
			>
				{options?.map((opt, index) => {
					if (isValidElement(opt)) return opt

					const isObj = isObject(opt)
					const isSelected =
						isObj && isObject(internalSelected)
							? opt.label === internalSelected.label
							: opt === internalSelected

					return (
						<li
							key={index}
							className="
								rounded-md px-4 py-1 cursor-pointer text-charcoal-100
								data-[selected=true]:bg-grey-100 hover:bg-grey-100 truncate
								data-[status=false]:opacity-50 data-[status=false]:cursor-not-allowed
							"
							data-selected={isSelected}
							data-status={isObj ? opt.disabled : undefined}
							onClick={() => {
								if (!isObj || !opt.disabled) handleSelect(opt)
							}}
						>
							{isObj ? opt.label : opt}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

Select.displayName = "Select"

export default forwardRef(Select) as <T extends string | SelectOption | ReactNode>(
	props: SelectProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
