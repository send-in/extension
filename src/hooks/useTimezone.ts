"use client"

// #region imports
import { 
    useEffect, 
    useMemo, 
    useState 
} from "react"

import { 
    formatInTimezone, 
    createDateInTimezone 
} from "@/utils"

import { 
    getTimezonesForCountry 
} from "countries-and-timezones"

import { 
    byCountry 
} from "country-code-lookup"
// #endregion

type Segment =
	| "morning"
	| "afternoon"
	| "evening"
	| "night"

export const useTimezone = (
	country: string,
	zone?: string,
) => {
	const [now, setNow] = useState(
		() => new Date(),
	)

	const code = useMemo(
		() => byCountry(country || "India"),
		[country],
	)

	const internalTimezone = useMemo(
		() => getTimezonesForCountry(
			code?.iso2 || "IN",
		)?.at(0),
		[code?.iso2],
	)

	const timeZone =
		zone ||
		internalTimezone?.name ||
		"Asia/Kolkata"

	const parts = useMemo(
		() => Object.fromEntries(
			new Intl.DateTimeFormat(
				"en-US",
				{
					timeZone,
					year: "numeric",
					month: "numeric",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: false,
				},
			)
				.formatToParts(now)
				.filter(part => part.type !== "literal")
				.map(part => [part.type, part.value]),
		),
		[now, timeZone],
	)

	const year  = Number(parts.year)
	const month = Number(parts.month)
	const day   = Number(parts.day)
	const hour  = Number(parts.hour)

	const segment: Segment =
		hour >= 5 && hour < 14
			? "morning"
			: hour >= 14 && hour < 17
				? "afternoon"
				: hour >= 17 && hour < 21
					? "evening"
					: "night"

	const createScheduled = (
		dayOffset: number,
		targetHour: number,
		label: string,
	) => {
		const date = createDateInTimezone(
			year, month, day + dayOffset, targetHour, timeZone,
		)
		return {
			label,
			...formatInTimezone(date, timeZone),
			scheduledAt: date.toISOString(),
		}
	}

	let morning
	let afternoon
	let evening

	switch (segment) {
		case "morning": {
			morning   = createScheduled(
                hour < 8 ? 0 : 1, 8,
                hour < 8 ? "This morning" : "Tomorrow morning"
            )

			afternoon = createScheduled(0, 14, "This afternoon")
			evening   = createScheduled(0, 18, "This evening")
			break
		}

		case "afternoon": {
			morning   = createScheduled(1, 8,  "Tomorrow morning")
			afternoon = createScheduled(1, 14, "Tomorrow afternoon")
			evening   = createScheduled(0, 18, "This evening")
			break
		}

		case "night": {
			morning   = createScheduled(0, 8,  "Later this morning")
			afternoon = createScheduled(0, 14, "This afternoon")
			evening   = createScheduled(0, 18, "This evening")
			break
		}

		case "evening":
		default: {
			morning   = createScheduled(1, 8,  "Tomorrow morning")
			afternoon = createScheduled(1, 14, "Tomorrow afternoon")
			evening   = createScheduled(1, 18, "Tomorrow evening")
			break
		}
	}

	useEffect(() => {
		const interval = setInterval(
			() => setNow(new Date()),
			30_000,
		)
		return () => clearInterval(interval)
	}, [])

	return {
		now,
		segment,
		timeZone,

		current: formatInTimezone(now, timeZone),

		morning,
		afternoon,
		evening,

		...code,
		...internalTimezone,
	}
}