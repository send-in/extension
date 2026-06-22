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
    getTimezone,
    getTimezonesForCountry, 
} from "countries-and-timezones"

import { 
    byCountry,
    byIso
} from "country-code-lookup"
// #endregion

type Segment =
	| "morning"
	| "afternoon"
	| "evening"
	| "night"

export const useTimezone = ({
	country,
	zone,
}:{
    country?: string,
	zone?: string,
}) => {
	const [now, setNow] = useState(
		() => new Date(),
	)

    const { code, timeZone } = useMemo(() => {
        if (zone) {
            const timeZone = getTimezone(zone)!
            return {
                timeZone,
                code: byIso(
                    timeZone.countries?.at(0)!
                ),
            }
        }

        const code = byCountry(country || "India")
        return {
            code,
            timeZone: getTimezonesForCountry(
                code?.iso2 || "IN"
            )?.at(0)
        }
    }, [country, zone])
    

	const parts = useMemo(
		() => Object.fromEntries(
			new Intl.DateTimeFormat(
				"en-US",
				{
					timeZone: timeZone!.name,
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
			year, month, day + dayOffset, targetHour, timeZone!.name,
		)
		return {
			label,
			...formatInTimezone(date, timeZone!.name),
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
            if (hour < 5) {
                morning   = createScheduled(0, 8,  "Later this morning")
                afternoon = createScheduled(0, 14, "This afternoon")
                evening   = createScheduled(0, 18, "This evening")
            } else {
                morning   = createScheduled(1, 8,  "Tomorrow morning")
                afternoon = createScheduled(1, 14, "Tomorrow afternoon")
                evening   = createScheduled(1, 18, "Tomorrow evening")
            }
            break
        }

		case "evening":
        default: {
            morning   = createScheduled(1, 8,  "Tomorrow morning")
            afternoon = createScheduled(1, 14, "Tomorrow afternoon")
            evening   = createScheduled(
                hour < 18 ? 0 : 1,
                18,
                hour < 18 ? "This evening" : "Tomorrow evening",
            )
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

		current: formatInTimezone(now, timeZone!.name),

		morning,
		afternoon,
		evening,

		...code,
		...timeZone,
	}
}