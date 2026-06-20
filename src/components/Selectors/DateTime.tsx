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

const DEFAULT_TIMEZONE = "Asia/Kolkata"

const DateTime = ({ timezone }:{
    timezone?: string
}) => {
    const [open, setOpen] = useState<boolean>(false)

    const [selectedTimezone, setSelectedTimezone] = useState<string>(
        timezone || DEFAULT_TIMEZONE
    )
    
    const {
        current,
        morning,
        afternoon,
        evening,
    } = useTimezone({
        zone: selectedTimezone
    })
    
    const [selectedDateTime, setSelectedDateTime] 
        = useState<string | undefined>(morning.scheduledAt)

    const selected = {
        morning:   selectedDateTime === morning.scheduledAt,
        afternoon: selectedDateTime === afternoon.scheduledAt,
        evening:   selectedDateTime === evening.scheduledAt,
    }

    const customValue = toDateTimeLocal(
        selectedDateTime ? new Date(selectedDateTime) : new Date(),
        selectedTimezone,
    )
    const resetToSaved = () => {
        setSelectedTimezone(timezone || DEFAULT_TIMEZONE)
        setSelectedDateTime(undefined)
    }

    const handleOpen = () => {
        resetToSaved()
        setOpen(true)
    }

    const handleCancel = () => {
        resetToSaved()
        setOpen(false)
    }

    const handleSave = () => {
        setOpen(false)
    }

    const handleCustomDate = (localValue: string) => {
        if (!localValue) return
 
        const [datePart, timePart] = localValue.split("T")
        const [year, month, day]   = datePart.split("-").map(Number)
        const [hour, minute]       = timePart.split(":").map(Number)
 
        const date = createDateInTimezone(
            year, month, day, hour, selectedTimezone, minute,
        )

        setSelectedDateTime(date.toISOString())
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
					className="gap-3 min-w-58!"
					variant={"primary"}
                    onClick={()=>setOpen(true)}
					startIcon={<Logo/>}
				>
					Schedule
				</Button>
			}
		>
	
			<section className="
                flex justify-between 
                items-center px-2
            ">
                <Logo 
                    size={60} 
                    className="fill-blue-100"
                />

				<aside className="
                    flex flex-col w-max
                    gap-1 text-xl ml-auto
                ">
					<p className="mr-2 text-right">
                        {`${current.date}, ${current.time}`}
                    </p>

					<TimeZone
                        className="w-full!"
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                    />
				</aside>
			</section>

            {
                <Information
                    description="time is displayed  as in receiver's time zone"
                />
            }

			<section
				className="flex flex-col gap-2"
			>
				<Button
					className="py-1!"
					textClassName="justify-between w-full !flex"
                    variant={selected.morning ? "primary" : "neutral"}
                    onClick={() => setSelectedDateTime(morning.scheduledAt)}
				>
						<span>{morning?.label}</span>
						<span>{`${morning?.date}, ${morning?.time}`}</span>
				</Button>

				<Button
					textClassName="justify-between w-full !flex"
					variant={selected.afternoon ? "primary" : "neutral"}
					className="py-1!"
                    onClick={() => setSelectedDateTime(afternoon.scheduledAt)}
				>
						<span>{afternoon?.label}</span>
						<span>{`${afternoon?.date}, ${afternoon?.time}`}</span>
				</Button>

				<Button
                    textClassName="justify-between w-full !flex"
                    variant={selected.evening ? "primary" : "neutral"}
					className="py-1!"
                    onClick={() => setSelectedDateTime(evening.scheduledAt)}
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
                    variant="neutral"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button
                    size="auto"
                    loadingText="Saving"
                    variant="secondary"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </section>
		</Popover>
	)
}

export default DateTime