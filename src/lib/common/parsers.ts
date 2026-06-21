export interface Profile {
    name: string
    location: string
    profile: string
    picture?: string
}

export function parseProfile(): Profile | null {
    const account: Profile = {
        name: "",
        location: "",
        profile: location.href,
    }

    account.name = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("h2")
    )?.at(1)?.textContent?.trim() ??  ""

    account.picture = Array.from(
        document.querySelectorAll<HTMLImageElement>("img")
    )?.at(2)?.src ??  ""

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

    account.location = parts.join(", ")

    return account.location
        ? account
        : null
}