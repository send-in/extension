// #region imports
import madaRegular from "@fontsource/mada/400.css?inline"
import madaMedium from "@fontsource/mada/500.css?inline"
import madaSemibold from "@fontsource/mada/600.css?inline"
import madaBold from "@fontsource/mada/700.css?inline"
import globalCss from "@/globals.css?inline"

import { 
    createRoot, 
    type Root 
} from "react-dom/client"

import { 
    inferTimezone, 
    parseProfile 
} from "@/lib"

import {
    DateTime
} from "@/widgets"
// #endregion

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

let shadowRoot = document.querySelector(
    "#interop-outlet"
)?.shadowRoot

const getMessageText = (): string => {
    if (!shadowRoot)
        return ""

    const editors = Array.from(
        shadowRoot.querySelectorAll<HTMLElement>(
            '[contenteditable="true"]'
        )
    )

    return (
        editors.find(e => e.innerText.trim())
            ?.innerText.trim() ?? ""
    )
}

const bodyObserver = new MutationObserver(()=>{
    shadowRoot = document.querySelector(
        "#interop-outlet"
    )?.shadowRoot

    if(shadowRoot){
        observer.observe(
            shadowRoot, {
                attributes: false, 
                characterData: false,

                childList: true, 
                subtree:true
            }
        )

        bodyObserver.disconnect()
    }
})

const observer = new MutationObserver(() => {
    if (!shadowRoot) 
        return

    let host = shadowRoot.getElementById(HOST_ID)
    if (host) return    

    const { 
        name, 
        profile,
        location, 
        picture = ""
    } = parseProfile()

    const timezone = inferTimezone(location)

    const actions = Array.from(
        shadowRoot.querySelectorAll<HTMLButtonElement>("button")
    ).find(b => b.textContent?.trim() === "Send")

    if (actions && timezone) {
        host = document.createElement("div")
        host.id = HOST_ID

        const shadow = host.attachShadow({ mode: "open" })
        const style = document.createElement("style")
        style.textContent = SHADOW_CSS
        shadow.append(style)

        const mountPoint = document.createElement("div")
        shadow.append(mountPoint)

        root = createRoot(mountPoint)
        root.render(
            <DateTime
                timezone={timezone}
                onSave={
                    async ({ 
                        timezone, 
                        scheduleTime 
                    }) => {
                        await chrome?.runtime?.sendMessage({ 
                            action: "SEND_MESSAGE",
                            payload: [{
                                message: getMessageText(),
                                name,
                                profile,
                                picture,
                                timezone,
                                scheduleTime
                            }]
                        })
                    }}
            />
        )

        actions
            .parentElement
            .parentElement
            .prepend(host)
    }
})

bodyObserver.observe(
    document, {
        attributes: false, 
        characterData: false,

        childList: true, 
        subtree:true
    }
)
