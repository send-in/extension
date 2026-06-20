// #region imports
import { useTimezone } from "@/hooks";
import { IMessage } from "@/lib"
// #endregion

export const DashboardCard = ({
	data,
	onClick,
	selected,
}:{
	data: IMessage
	onClick: (message: IMessage) => void
	selected: boolean
}) => {

	const {
		name,
		picture,
        timezone,
		scheduledAt,
		isSent,
	} = data

	const formatted = new Intl.DateTimeFormat(
        "en-US",
        {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "2-digit",
            month: "short",
            timeZone: timezone || "Asia/Kolkata",
        },
    ).format(
        new Date(scheduledAt),
    )

    const { iso3 } = useTimezone({
        zone: timezone
    })

	return (
		<li
			className="
				list-none flex text-base items-center w-full
				min-h-10 py-1 px-2 rounded-xl text-grey-200
                justify-between smooth cursor-pointer border-2 
                border-white bg-white text-sm

                hover:border-grey-100 
                active:border-grey-200 
                data-[selected=true]:border-blue-100 
			"
			onClick={()=>onClick(data)}
			data-selected={selected}
		>

			<aside
                className="
                    flex items-center gap-2
                    text-charcoal-100 w-[55%] min-w-0
                    select-none
                "
            >
                <img
                    className="rounded-full w-8 h-8 shrink-0"
                    alt={name || "SendIn"}
                    src={picture || "/profile.svg"}
                />

                <p className="truncate flex-1 min-w-0">
                    {name}
                </p>
            </aside>

            {!isSent ?
                <p className="
                    text-blue-100 text-nowrap
                ">
                    {formatted} {iso3}
                </p>:
                <p>
                    &#x2713; &emsp;Sent
                </p>
            }
		</li>
	)
}
