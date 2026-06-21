"use client"

// #region imports
import {
    forwardRef,
    isValidElement,
    ReactElement,
    ReactNode,
    Ref,
    useEffect,
    useRef,
    useState,
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
    md: "text-xl px-4",
    lg: "text-lg px-5",
}

const variantClasses = {
    primary: "bg-blue-100 text-white hover:bg-blue-200 focus:ring-blue-100",
    neutral: "bg-grey-100 text-grey-300 hover:bg-bluewash focus:ring-grey-200",
}

const isObject = (val: any): val is SelectOption =>
    val && typeof val === "object" && "label" in val

const Select = <T extends string | SelectOption | ReactNode>(
    {
        name,
        options,
        selected,
        placeholder,
        disabled,
        size = "md",
        variant = "primary",
        className = "",
        buttonClassName = "",
        dropdownClassName = "",
        onChange,
    }: SelectProps<T>,
    ref: Ref<HTMLDivElement>,
) => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const [internalSelected, setInternalSelected] =
        useState<T | undefined>(selected)

    useEffect(() => {
        setInternalSelected(selected)
    }, [selected])

    const handleSelect = (opt: T) => {
        setInternalSelected(opt)
        setOpen(false)
        onChange?.(opt)
    }

    const hiddenValue = (() => {
        if (!internalSelected) return ""

        if (isObject(internalSelected))
            return internalSelected.value

        if (typeof internalSelected === "string")
            return internalSelected

        return ""
    })()

    const selectedOption = options?.find(opt =>
        isObject(opt) && isObject(internalSelected)
            ? opt.label === internalSelected.label
            : opt === internalSelected,
    )

    return (
        <div
            ref={node => {
                wrapperRef.current = node

                if (typeof ref === "function")
                    ref(node)
                else if (ref)
                    ref.current = node
            }}
            className={cn(
                "relative inline-block",
                className,
            )}
        >
            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={hiddenValue}
                />
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(prev => !prev)
                }}
                className={cn(
                    `
                        rounded-full font-medium
                        smooth min-w-26 border-none 
                        flex items-center justify-between 
                        gap-2 focus:outline-none
                        focus:ring-2 focus:ring-inset
                        mb-2 py-2
                    `,
                    sizeClasses[size],
                    selectedOption
                        ? variantClasses[variant]
                        : "bg-white text-grey-300 hover:bg-grey-100",
                    buttonClassName,
                )}
            >
                <span className="truncate">
                    {isObject(selectedOption)
                        ? selectedOption.label
                        : selectedOption ||
                          placeholder ||
                          "Select"}
                </span>

                <span
                    className={cn(
                        "transition-transform",
                        open && "rotate-180",
                    )}
                >
                    ▼
                </span>
            </button>

            {open && (
                <ul
                    className={cn(
                        `
                            absolute left-0 top-full
                            mt-2 w-72 rounded-xl border
                            border-grey-100 bg-white
                            shadow-xl z-[9999]
                            overflow-y-auto max-h-[40vh]
                            p-2 space-y-1
                        `,
                        dropdownClassName,
                    )}
                >
                    {options?.map((opt, index) => {
                        if (isValidElement(opt))
                            return opt

                        const isObj = isObject(opt)

                        const isSelected =
                            isObj &&
                            isObject(internalSelected)
                                ? opt.label ===
                                  internalSelected.label
                                : opt === internalSelected

                        return (
                            <li
                                key={index}
                                className={cn(
                                    `
                                        px-4 py-2 rounded-lg
                                        cursor-pointer truncate
                                        transition-colors
                                    `,
                                    isSelected
                                        ? "bg-grey-100"
                                        : "hover:bg-grey-100",
                                    isObj &&
                                        opt.disabled &&
                                        "opacity-50 pointer-events-none",
                                )}
                                onClick={() =>
                                    handleSelect(opt)
                                }
                            >
                                {isObj
                                    ? opt.label
                                    : opt}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

Select.displayName = "Select"

export default forwardRef(Select) as <T extends string | SelectOption | ReactNode>(
    props: SelectProps<T> & {
        ref?: Ref<HTMLDivElement>
    },
) => ReactElement