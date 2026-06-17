"use client"

// #region imports
import {
	ReactNode,
	useState
} from "react"

import { Search } from "@/icons"

import {
	Select,
	TextField
} from "@/base"

import zones from "@/timezones.json"
// #endregion


interface TimeZoneProps {
    name?: string
	value?: string
	onChange?: (zone: string) => void
    className?: string
}

const currentZone: string =
	Intl.DateTimeFormat()
	.resolvedOptions()
	.timeZone


export const TimeZone = ({
    name,
	value,
	onChange,
    className
}: TimeZoneProps) => {
	const [search, setSearch] = useState<string>("")

	return (
		<Select<string | ReactNode>
            name={name}
            buttonClassName={className}
			className="dropdown-end text-base desktop:text-xl"
			onChange={val => {
				if (typeof val === "string") 
                    onChange?.(val)
			}}
			selected={value || currentZone}
			placeholder="Select Timezone"
			variant="primary"
			options={[
				<div
					className="sticky -top-2 bg-white py-2"
					key="search"
				>
					<TextField
						key="search"
						variant="filled"
						placeholder="Search"
						onChange={(e)=>setSearch(e.target.value)}
						endIcon={<Search />}
					/>
				</div>,
				...zones.filter(
					val => val.toLowerCase()?.includes(
                        search.toLowerCase()
                    )
				)
			]}
		/>
	)
}
