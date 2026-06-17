// #region imports
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
            timeZoneName: "longGeneric",
            timeZone: timezone || "Asia/Kolkata",
        },
    ).format(
        new Date(scheduledAt),
    )

	return (
		<li
			className="
				list-none flex text-base items-center w-full
				min-h-12 py-1 px-2 rounded-2xl text-grey-200
                justify-between smooth cursor-pointer border-2 border-white 
				bg-white hover:border-grey-100 active:border-grey-200 
                data-[selected=true]:border-blue-100
			"
			onClick={()=>onClick(data)}
			data-selected={selected}
		>

			<aside
				className="
                    flex items-center gap-4 text-charcoal-100
                    smooth w-[55%] shrink-0
                "
			>
                <img
                    className="rounded-full w-32 h-32"
                    alt={name || "SendIn"}
                    src={picture || "/profile.svg"}
                />
                <p className="truncate">
                    {name}
                </p>
			</aside>

            {!isSent ?
                <p className="
                    text-blue-100 text-nowrap
                ">
                    {formatted}
                </p>:
                <p>
                    &#x2713; &emsp;Sent
                </p>
            }
		</li>
	)
}
