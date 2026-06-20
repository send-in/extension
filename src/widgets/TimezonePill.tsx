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
        timezone &&
		<aside
			className={`
				inline-flex items-center gap-2
				p-3 py-2 rounded-full bg-blue-100 
                text-white text-xl font-medium 
                fill-white w-fit ${className}
			`}
		>
            <Globe/>
			<span>{
                formatTimezone(timezone)
            }</span>
		</aside>
	)
}