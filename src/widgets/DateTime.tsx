"use client"

// #region imports
import { ReactNode, useState } from "react"

import zones from "@/timezones.json"
import { useTimezone } from "@/hooks"

import { 
    createDateInTimezone,
    toDateTimeLocal
} from "@/utils"

import { 
    Clock, 
    Logo, 
    Search 
} from "@/icons"

import {
	Popover,
	Button,
	Information,
    DateTimeField,
    Select,
    TextField,
} from "@/base"
// #endregion

const DEFAULT_TIMEZONE = "Asia/Kolkata"

export const DateTime = ({ timezone, onSave }:{
    timezone?: string,
    onSave?: (args: {
        timezone: string
        scheduleTime: string
    }) => Promise<void>
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

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

    const handleCancel = () => {
        resetToSaved()
        setOpen(false)
    }

    const handleSave = async () => {
        if (!selectedDateTime)
            return

        await onSave?.({
            timezone: selectedTimezone,
            scheduleTime: selectedDateTime,
        })

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
                min-w-max text-xl!
                tracking-tighter!
            "
            modalOpen={open}
			trigger={
				<Button
                    size="xs"
					className="
                        min-w-32! mr-2 px-4!
                        text-[1.5rem]! font-medium!
                    "
					variant="primary"
                    onClick={()=>setOpen(true)}
					startIcon={<Logo size={20}/>}
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
                    size={45} 
                    className="fill-blue-100"
                />

				<aside className="
                    flex flex-col w-max
                    gap-1 text-2xl ml-auto
                ">
					<p className="mr-2 text-right">
                        {`${current.date}, ${current.time}`}
                    </p>

                    <Select<string | ReactNode>
                        className="dropdown-end text-xl"
                        buttonClassName="w-full!"
                        onChange={val => {
                            if (typeof val === "string") 
                                setSelectedTimezone?.(val)
                        }}
                        selected={selectedTimezone}
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
                                    className="text-xl!"
                                    onChange={(e)=>setSearch(e.target.value)}
                                    endIcon={<Search size={18}/>}
                                />
                            </div>,
                            ...zones.filter(
                                val => val.toLowerCase()?.includes(
                                    search.toLowerCase()
                                )
                            )
                        ]}
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
					className="py-1! text-xl!"
					textClassName="justify-between w-full !flex"
                    variant={selected.morning ? "primary" : "neutral"}
                    onClick={() => setSelectedDateTime(morning.scheduledAt)}
				>
						<span>{morning?.label}</span>
						<span>{`${morning?.date}, ${morning?.time}`}</span>
				</Button>

				<Button
					textClassName="justify-between w-full !flex text-xl!"
					variant={selected.afternoon ? "primary" : "neutral"}
					className="py-1!"
                    onClick={() => setSelectedDateTime(afternoon.scheduledAt)}
				>
						<span>{afternoon?.label}</span>
						<span>{`${afternoon?.date}, ${afternoon?.time}`}</span>
				</Button>

				<Button
                    textClassName="justify-between w-full !flex text-xl!"
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
                    flex justify-between gap-4 
                    items-center text-grey-200 px-2
                "
			>
				<p>
					Custom Date/Time
				</p>

                <DateTimeField
                    className="text-xl!"
                    startIcon={<Clock size={18}/>}
                    value={customValue}
                    onChange={handleCustomDate}
                />
			</section>

            <div className="
                h-px bg-grey-200 
                rounded-full w-full
            "/>

            <section
                className="
                    flex justify-end gap-2
                    pt-4
                "
            >
                <Button
                    className="text-xl!"
                    variant="neutral"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button
                    className="text-xl!"
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