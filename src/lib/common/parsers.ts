export interface Profile {
    name: string
    location: string
    url: string
}

export function parseLocation(): Profile | null {
    const profile: Profile = {
        name: "",
        location: "",
        url: location.href,
    }

    profile.name =
        document.querySelector("h1")?.textContent?.trim() ??
        ""

    const contact = Array.from(
        document.querySelectorAll<HTMLAnchorElement>("a")
    ).find(a =>
        a.textContent?.trim().toLowerCase() === "contact info"
    )

    if (!contact)
        return null

    const container = contact.parentElement?.parentElement
    if (!container)
        return null

    const parts: string[] = []

    container.querySelectorAll("p").forEach(p => {
        const text = p.textContent?.trim() ?? ""

        if (
            !text ||
            text === "·" ||
            text.toLowerCase().includes("contact info")
        ) {
            return
        }

        parts.push(text)
    })

    profile.location = parts.join(", ")

    return profile.location
        ? profile
        : null
}