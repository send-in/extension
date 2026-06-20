"use client"

// #region imports
import {
	forwardRef,
	HTMLAttributes
} from "react"

import {
	cn
} from "@/utils"

import {
	Chevron
} from "@/icons"
import { useSearchParams } from "react-router-dom"
// #endregion

const paginationVariants = {
	base: `
		flex items-center gap-2 select-none w-full
		text-charcoal-100 font-normal text-base
		justify-center -mt-8
		desktop:text-base
		max-mobile:px-0
		max-mobile:pt-8
	`,

	button: `
		btn btn-circle smooth ease-in-out bgb
		active:scale-95 focus:outline-none border-none
		disabled:opacity-50 disabled:cursor-not-allowed
		smooth text-grey-200 btn-neutral hover:text-blue-100
	`,

	variants: {
		default: `btn-ghost hover:btn-neutral`,
		active: `text-blue-200`,
		navigation: `btn-neutral hover:text-blue-200`,
	},

	sizes: {
		small: "btn-xs w-6 h-6 text-xs",
		medium: "btn-sm w-10 h-10 text-sm",
		large: "btn-md w-12 h-12 text-base",
	},

	ellipsis: `
		px-2 text-grey-200 select-none
		pointer-events-none transition-all
		duration-500 ease-in-out
	`,
}

export interface PaginationProps
	extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
	page: number
	count: number
	siblingCount?: number
	size?: keyof typeof paginationVariants.sizes
	disabled?: boolean
	showFirstButton?: boolean
	showLastButton?: boolean
	className?: string
}

const range = (start: number, end: number): number[] =>
	Array.from({ length: end - start + 1 }, (_, i) => start + i)

const Pagination = forwardRef<HTMLElement, PaginationProps>(
	(
		{
			page,
			count,
			siblingCount = 1,
			size = "medium",
			disabled = false,
			showFirstButton = false,
			showLastButton = false,
			className = "",
			...props
		},
		ref
	) => {
        const [searchParams, setSearchParams] = useSearchParams()

		const handleClick = (value: number) => () => {
			if (!disabled && value !== page){
				const params = new URLSearchParams(searchParams)
				params.set("page", String(value))
				setSearchParams(params)
			}
		}

		const totalNumbers = siblingCount * 2 + 3
		const pages: (number | "ellipsis")[] =
			count <= totalNumbers
				? range(1, count)
				: (() => {
					const left = Math.max(page - siblingCount, 2)
					const right = Math.min(page + siblingCount, count - 1)
					const arr: (number | "ellipsis")[] = [1]

					if (left > 2) arr.push("ellipsis")
					arr.push(...range(left, right))
					if (right < count - 1) arr.push("ellipsis")
					arr.push(count)
					return arr
				})()

		const containerClasses = cn(paginationVariants.base, className)
		const navBtnClasses = cn(
			paginationVariants.button,
			paginationVariants.variants.navigation,
			paginationVariants.sizes[size]
		)
		const pageBtnClasses = (active: boolean) =>
			cn(
				paginationVariants.button,
				active ? paginationVariants.variants.active : paginationVariants.variants.default,
				paginationVariants.sizes[size]
			)
		const ellipsisClasses = cn(paginationVariants.ellipsis)

		return (
			<nav
				ref={ref}
				className={containerClasses}
				role="navigation"
				aria-label="Pagination"
				{...props}
			>
				{showFirstButton && (
					<button
						className={navBtnClasses}
						disabled={disabled || page === 1}
						onClick={handleClick(1)}
						aria-label="Go to first page"
					>
						<Chevron direction="left" size={20} />
					</button>
				)}

				<button
					className={navBtnClasses}
					disabled={disabled || page === 1}
					onClick={handleClick(page - 1)}
					aria-label="Go to previous page"
				>
					<Chevron direction="left" size={20} />
				</button>

				{pages.map((p, idx) =>
					p === "ellipsis" ? (
						<span key={idx+p} className={ellipsisClasses}>
							…
						</span>
					) : (
						<button
							key={p}
							className={pageBtnClasses(p === page)}
							disabled={disabled}
							onClick={handleClick(p)}
							aria-label={`Go to page ${p}`}
							aria-current={p === page ? "page" : undefined}
						>
							{p}
						</button>
					)
				)}

				<button
					className={navBtnClasses}
					disabled={disabled || page === count}
					onClick={handleClick(page + 1)}
					aria-label="Go to next page"
				>
					<Chevron direction="right" size={20} />
				</button>

				{showLastButton && (
					<button
						className={navBtnClasses}
						disabled={disabled || page === count}
						onClick={handleClick(count)}
						aria-label="Go to last page"
					>
						<Chevron direction="right" size={20} />
					</button>
				)}
			</nav>
		)
	}
)

Pagination.displayName = "Pagination"
export default Pagination
