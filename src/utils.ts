
export type ICurrency =
    | "USD"
    | "INR"
    | "EUR"
    | "GBP"
    | "AED"

// Simple className utility (no external dependencies)
type ClassValue = string | number | boolean | undefined | null | ClassValue[]

type LexicalNode = {
	type: string
	children?: LexicalNode[]
	text?: string
	format?: number
	tag?: string
	listType?: "number" | "bullet"
	url?: string
}

export const cn = (...inputs: ClassValue[]): string => {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const getAbbreviation = (timezone: string): string => {
    try {
        const date = new Date()
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            timeZoneName: "short",
        })
        const parts = formatter.formatToParts(date)
        const abbr = parts.find((p) => p.type === "timeZoneName")?.value
        return abbr ?? timezone
    } catch {
        return timezone
    }
}

export const parseQueryParams = <T extends string = string>(
	query: string
): Record <T, string | string[]> => {
	const params = new URLSearchParams(query)
	const result: Record<string, string | string[]> = {}

	params.forEach((value, key) => {
		const decoded = decodeURIComponent(value)
		decoded.includes(",") ?
			result[key] = decoded.split(",").filter(Boolean) :
			result[key] = decoded
	})

	return result
}

export type IClassValue = string | number | boolean | undefined | null | IClassValue[]

export const capitalize = (
    str: string
) => {

    if (
        !str ||
        typeof str !== "string"
    )
        return ""

    const res = str
        .split(/[-_]/g)
        .join(" ")

    return (
        res.charAt(0)
            .toUpperCase() +
        res.slice(1)
    )
}

export const validImageSrc = (src?: string | null): string | undefined => {
    if (src == null) return undefined
    const s = String(src).trim()
    if (!s || s === "undefined" || s === "null") return undefined
    return s
}

export const isKeyOf = <T extends object>(
	obj: T,
	key: unknown
): key is keyof T => {
	return typeof key === "string" && key in obj
}

export const injectImages = <
	T extends object,
	I extends object
>(
	cards: T[],
	images: I[],
	cols: number
): Array<T | I> => {
	if (!cards.length || !images.length || cols <= 0) return [...cards]

	const totalRows = Math.floor(cards.length / cols)
	const usableImages = images.slice(0, Math.floor(totalRows / 2))
	if (!usableImages.length) return [...cards]

	const rows =
		usableImages.length === 1
			? [0]
			: usableImages.map((_, i, a) =>
					Math.round((i * (totalRows - 2)) / (a.length - 1))
			  )

	const result: Array<T | I> = []
	let row = 0
	let image = 0

	for (let i = 0; i < cards.length; i++) {
		if (i % cols === 0) {
			if (row === rows[image]) result.push(usableImages[image++])
			row++
		}
		result.push(cards[i])
	}

	return result
}

export const parseDate = (value: string) => {
    const [day, month, year] = value.split("/")
    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    )
}

export const createDateInTimezone = (
    year: number,
    month: number,
    day: number,
    hour: number,
    timezone: string,
    minute: number = 0,
): Date => {
    const approxMs = Date.UTC(year, month - 1, day, hour, minute, 0)
 
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        })
            .formatToParts(new Date(approxMs))
            .filter(p => p.type !== "literal")
            .map(p => [p.type, p.value]),
    )
 
    const tzMs = Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        Number(parts.hour),
        Number(parts.minute),
        Number(parts.second),
    )
 
    return new Date(2 * approxMs - tzMs)
}

export const toDateTimeLocal = (
    date?: Date,
    timezone?: string,
) => {
    const formatter = new Intl.DateTimeFormat("sv-SE", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    })
 
    const parts = Object.fromEntries(
        formatter
            .formatToParts(date)
            .filter(part => part.type !== "literal")
            .map(part => [part.type, part.value]),
    )
 
    return (
        `${parts.year}-${parts.month}-${parts.day}` +
        `T${parts.hour}:${parts.minute}`
    )
}

export const formatInTimezone = (
    date: Date,
    timezone: string,
) => ({
    date: date.toLocaleDateString("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }),
})

export const formatDateTimeLocal = (
    value?: string,
) => {
    if (!value)
		return {
    date: "",
			time: "",
		}

	const [datePart, timePart] =
		value.split("T")

	const [year, month, day] =
		datePart
			.split("-").
			map(Number)

	const date = new Date(
		year,
		month - 1,
		day,
	)

	const time = new Date(
		`2000-01-01T${timePart}`,
	)

	return {
		date: date.toLocaleDateString(
			"en-US",
			{
				weekday: "short",
				month: "short",
				day: "numeric",
			},
		),

		time: time.toLocaleTimeString(
			"en-US",
			{
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			},
		),
	}
}

export const parseLexicalHTML = (
	value?: string,
): string => {
	if (!value) return ""

	try {
		const editor = JSON.parse(value)

		const render = (node: LexicalNode): string => {
			const children = (node.children ?? [])
				.map(render)
				.join("")

			switch (node.type) {
				case "root":
					return children

				case "paragraph":
					return `<p>${children}</p>`

				case "heading": {
					const tag = node.tag ?? "1"
					return `<h${tag}>${children}</h${tag}>`
				}

				case "list": {
					const tag =
						node.listType === "number"
							? "ol"
							: "ul"

					return `<${tag}>${children}</${tag}>`
				}

				case "listitem":
					return `<li>${children}</li>`

				case "linebreak":
					return "<br />"

				case "link":
					return `
						<a
							href="${node.url}"
							target="_blank"
							rel="noopener noreferrer"
						>
							${children}
						</a>
					`

				case "text": {
					let text = node.text ?? ""

					if (node.format && node.format & 1)
						text = `<strong>${text}</strong>`

					if (node.format && node.format & 2)
						text = `<em>${text}</em>`

					if (node.format && node.format & 8)
						text = `<u>${text}</u>`

					if (node.format && node.format & 16)
						text = `<code>${text}</code>`

					if (node.format && node.format & 32)
						text = `<sub>${text}</sub>`

					if (node.format && node.format & 64)
						text = `<sup>${text}</sup>`

					return text
				}

				default:
					return children
			}
		}

		return render(editor.root)
	} catch {
		return value
			.split("\n")
			.map(line => `<p>${line}</p>`)
			.join("")
	}
}