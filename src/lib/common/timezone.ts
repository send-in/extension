import cityTimezones from "city-timezones"
import { getTimezonesForCountry } from "countries-and-timezones"
import { getCode } from "country-list"

function normalizeCity(city: string) {
    return city
        .replace(/^Greater\s+/i, "")
        .replace(/\s+Metropolitan Area$/i, "")
        .replace(/\s+Metro Area$/i, "")
        .replace(/\s+Area$/i, "")
        .trim()
}

export function inferTimezone(location: string): string | undefined {
    const parts = location
        .split(",")
        .map(part => part.trim())
        .filter(Boolean)

    let city: string | undefined
    let country: string | undefined

    switch (parts.length) {
        case 1:
            if (/area$/i.test(parts[0])) {
                city = parts[0].replace(/\s+Area$/i, "")
            } else {
                country = parts[0]
            }
            break

        case 2:
            city = parts[0]
            country = parts[1]
            break

        default:
            city = parts[0]
            country = parts.at(-1)
            break
    }

    if (city)
        city = normalizeCity(city)

    const countryCode = country
        ? getCode(country)
        : undefined

    if (city && countryCode) {
        const matches = cityTimezones.lookupViaCity(city)

        const match = matches.find(
            entry => entry.country === countryCode,
        )

        if (match)
            return match.timezone
    }

    if (city) {
        const match = cityTimezones
            .lookupViaCity(city)
            .at(0)

        if (match)
            return match.timezone
    }

    if (countryCode) {
        const match = getTimezonesForCountry(countryCode)
            .at(0)

        if (match)
            return match.name
    }

    return
}