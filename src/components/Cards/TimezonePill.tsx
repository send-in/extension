// #region imports
import { Globe } from "@/icons"
// #endregion

interface TimezonePillProps {
	timezone?: string | null
	className?: string
}

const formatTimezone = (timezone?: string) => {
	const zone =
		timezone ??
		Intl.DateTimeFormat()
			.resolvedOptions()
			.timeZone

	return zone
}

export const TimezonePill = ({
	timezone,
	className = "",
}: TimezonePillProps) => {
	return (
		<aside
			className={`
				inline-flex items-center gap-2
				px-3 py-1.5 rounded-full
				bg-bluewash text-charcoal-200
				text-sm font-medium
				border border-grey-100
				w-fit
				${className}
			`}
		>
            <Globe/>
			<span>{formatTimezone(timezone)}</span>
		</aside>
	)
}