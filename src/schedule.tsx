import madaRegular from "@fontsource/mada/400.css?inline"
import madaMedium from "@fontsource/mada/500.css?inline"
import madaSemibold from "@fontsource/mada/600.css?inline"
import madaBold from "@fontsource/mada/700.css?inline"
import globalCss from "@/globals.css?inline"

import { createRoot, type Root } from "react-dom/client"
import { inferTimezone, parseLocation } from "@/lib"
import DateTime from "./components/Selectors/DateTime"

const SHADOW_CSS = [
    globalCss, 
    madaRegular, 
    madaMedium, 
    madaSemibold, 
    madaBold
].join("\n")
.replace(/:root/g, ":host")

const HOST_ID = "sendin-schedule-host"

let root: Root | null = null

function inject() {
    const { location } = parseLocation()
    if (!location) return

    const shadowRoot = document
        .querySelector("#interop-outlet")
        ?.shadowRoot

    if (!shadowRoot) return

    const actions = Array.from(
        shadowRoot.querySelectorAll<HTMLButtonElement>("button")
    ).find(button =>
        button.textContent?.trim() === "Send"
    )

    if (!actions) return

    let host = 
        shadowRoot.getElementById(HOST_ID) as HTMLDivElement | null

    if (!host) {
        host = document.createElement("div")
        host.id = HOST_ID

        const shadow = host.attachShadow({ mode: "open" })

        const style = document.createElement("style")
        style.textContent = SHADOW_CSS
        shadow.append(style)

        const mountPoint = document.createElement("div")
        shadow.append(mountPoint)

        root = createRoot(mountPoint)

        const timezone = inferTimezone(location)

        if (timezone) {
            root.render(
                <DateTime timezone={timezone}/>
            )
        }
    }

    if (host.parentElement !== actions) {
        actions
            .parentElement
            .parentElement
            .prepend(host)
    }
}

inject()

 new MutationObserver(inject).observe(document.body, {
    childList: true,
    subtree: true,
})