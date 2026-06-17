"use client"

// #region imports
import { useState } from "react"

import { 
    createDateInTimezone,
    toDateTimeLocal
} from "@/utils"

import { useTimezone } from "@/hooks"
import { TimeZone } from "@/components"
import { Clock, Logo } from "@/icons"

import {
	Popover,
	Button,
	Information,
    DateTimeField,
} from "@/base"
// #endregion

const DateTime = ({
    timezone,
    dateTime,

    onTimezoneChange,
    onDateChange,

    profile,
}:{
    timezone?: string
    dateTime?: string

    onTimezoneChange?: (value: string) => void
    onDateChange?: (value: string) => void

    profile?: {
        name?: string
        picture?: string
    }
}) => {
    const [open, setOpen] = useState<boolean>(false)

    const activeTimezone = timezone || "Asia/Kolkata"

    const {
        current,
        morning,
        afternoon,
        evening,
    } = useTimezone("", activeTimezone)

    const selected = {
        morning:   dateTime === morning.scheduledAt,
        afternoon: dateTime === afternoon.scheduledAt,
        evening:   dateTime === evening.scheduledAt,
    }

    const customValue = toDateTimeLocal(
        dateTime ? new Date(dateTime) : new Date(),
        activeTimezone,
    )

    const handleCustomDate = (localValue: string) => {
        if (!localValue) return
 
        const [datePart, timePart] = localValue.split("T")
        const [year, month, day]   = datePart.split("-").map(Number)
        const [hour, minute]       = timePart.split(":").map(Number)
 
        const date = createDateInTimezone(
            year, month, day, hour, activeTimezone, minute,
        )
 
        onDateChange?.(date.toISOString())
    }

	return (
		<Popover
            className="
                top-36 desktop:top-52 
                right-0 desktop:right-48
                space-y-4 max-w-[28%]!
                min-w-max
            "
            modalOpen={open}
			trigger={
				<Button
					className="font-medium! tracking-normal!"
					variant="primary"
                    onClick={()=>setOpen(true)}
					startIcon={<Logo />}
				>
					Schedule
				</Button>
			}
		>
			<section className="
                flex justify-between 
                items-center px-2
            ">
                {
                    profile ?
                    <img
                        className="rounded-full h-48 w-48 mt-2 ml-2"
                        alt={profile?.name || "SendIn"}
                        src={profile?.picture || "/profile.svg"}
                    /> :
                    <Logo 
                        size={60} 
                        className="fill-blue-100"
                    />
                }

				<aside className="
                    flex flex-col w-max
                    gap-1 text-xl ml-auto
                ">
					<p className="mr-2 text-right">
                        {`${current.date}, ${current.time}`}
                    </p>

					<TimeZone
                        className="w-full!"
                        value={activeTimezone}
                        onChange={onTimezoneChange}
                    />
				</aside>
			</section>

            {
                profile &&
                <Information
                    description="time is displayed  as in receiver's time zone"
                />
            }

			<section
				className="flex flex-col gap-2"
			>
				<Button
					className="!py-1"
					textClassName="justify-between w-full !flex"
                    variant={selected.morning ? "primary" : "neutral"}
                    onClick={() =>
                        onDateChange?.(
                            morning.scheduledAt
                        )
                    }
				>
						<span>{morning?.label}</span>
						<span>{`${morning?.date}, ${morning?.time}`}</span>
				</Button>

				<Button
					textClassName="justify-between w-full !flex"
					variant={selected.afternoon ? "primary" : "neutral"}
					className="!py-1"
                    onClick={() =>
                        onDateChange?.(
                            afternoon.scheduledAt
                        )
                    }
				>
						<span>{afternoon?.label}</span>
						<span>{`${afternoon?.date}, ${afternoon?.time}`}</span>
				</Button>

				<Button
                    textClassName="justify-between w-full !flex"
                    variant={selected.evening ? "primary" : "neutral"}
					className="!py-1"
                    onClick={() =>
                        onDateChange?.(
                            evening.scheduledAt
                        )
                    }
				>
						<span>{evening?.label}</span>
						<span>{`${evening?.date}, ${evening?.time}`}</span>
				</Button>
			</section>

			<section
				className="
                    text-base desktop:text-xl flex 
                    justify-between gap-4 items-center 
                    text-grey-200 px-2
                "
			>
				<p>
					Custom Date/Time
				</p>

                <DateTimeField
                    startIcon={<Clock size={18}/>}
                    value={customValue}
                    onChange={handleCustomDate}
                />
			</section>

            <section
                className="
                    flex justify-end gap-2
                    pt-2 border-t border-grey-100
                "
            >
                <Button
                    size="auto"
                    loadingText="Saving"
                    variant="secondary"
                    onClick={
                        () => setOpen(false)
                    }
                >
                    Done
                </Button>
            </section>
		</Popover>
	)
}

export default DateTime
