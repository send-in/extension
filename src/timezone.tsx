import madaRegular from "@fontsource/mada/400.css?inline"
import madaMedium from "@fontsource/mada/500.css?inline"
import madaSemibold from "@fontsource/mada/600.css?inline"
import madaBold from "@fontsource/mada/700.css?inline"
import globalCss from "@/globals.css?inline"

import { createRoot, type Root } from "react-dom/client"
import { CurrentTimePill } from "@/widgets/CurrentTimePill"
import { TimezonePill } from "@/widgets/TimezonePill"
import { inferTimezone, parseLocation } from "@/lib"

const SHADOW_CSS = [
    globalCss, 
    madaRegular, 
    madaMedium, 
    madaSemibold, 
    madaBold
].join("\n")
.replace(/:root/g, ":host")

const HOST_ID = "sendin-pill-host"

let root: Root | null = null

async function inject() {
    if (document.getElementById(HOST_ID))
        return

    const { location } = parseLocation()
    if (!location)
        return

    const messageLinks = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
            'a[href*="/messaging/compose/"]'
        )
    )

    const messageLink = messageLinks.at(1)
    if (!messageLink)
        return

    const actions = messageLink
        .closest<HTMLElement>("[data-display-contents='true']")
        ?.parentElement

    if (!actions)
        return

    const host = document.createElement("div")
    host.id = HOST_ID

    host.setAttribute("data-display-contents", "true")
    host.style.marginTop = "10px"
    actions.append(host)

    const shadow = host.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    style.textContent = SHADOW_CSS
    shadow.appendChild(style)

    const mountPoint = document.createElement("div")

    mountPoint.style.display = "flex"
    mountPoint.style.alignItems = "center"
    mountPoint.style.gap = "8px"
    shadow.appendChild(mountPoint)

    root?.unmount()
    root = createRoot(mountPoint)

    const timezone = inferTimezone(location)
    if (!timezone)
        return

    root.render(
        <>
            <CurrentTimePill timezone={timezone}/>
            <TimezonePill timezone={timezone}/>
        </>
    )

    console.log("[SendIn] injected")
}

inject()

const observer = new MutationObserver(() => {
    inject()
})

observer.observe(document.body, {
    childList: true,
    subtree: true,
})