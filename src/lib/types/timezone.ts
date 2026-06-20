export interface IRawTimezone {
	Country?: string
    Timezone?: string
}

export interface ITimezone {
	country?: string
    timezone?: string
}

export const serializeTimezone = (
	data: IRawTimezone,
): ITimezone => ({
	timezone: data.Timezone,
    country: data.Country
})