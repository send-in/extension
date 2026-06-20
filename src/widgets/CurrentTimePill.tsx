"use client"

// #region imports
import { useEffect, useState } from "react"
import { Clock } from "@/icons"
// #endregion

interface CurrentTimePillProps {
	timezone?: string
	className?: string
}

const getTime = (timezone?: string) => {
	const zone =
		timezone ??
		Intl.DateTimeFormat()
			.resolvedOptions()
			.timeZone

	return new Intl.DateTimeFormat(
	    "en-US",
		{
			timeZone: zone,
			weekday: "short",
			day: "numeric",
			month: "short",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		},
	).format(new Date())
}

export const CurrentTimePill = ({
	timezone,
	className = "",
}: CurrentTimePillProps) => {
	const [time, setTime] = useState(
		() => getTime(timezone),
	)

	useEffect(() => {
		setTime(getTime(timezone))

		const interval = setInterval(() => {
			setTime(getTime(timezone))
		}, 60_000)

		return () => clearInterval(interval)
	}, [timezone])

	return (
		<div
			className={`
				inline-flex items-center gap-2
				p-3 py-2 rounded-full bg-blue-100 
                text-white text-xl font-medium 
                fill-white w-fit ${className}
			`}
		>
			<Clock />

			<span>{time}</span>
		</div>
	)
}