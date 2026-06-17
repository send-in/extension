import { createRoot } from "react-dom/client"

import "@/globals.css"
import {
    EventsProvider,
    PortalProvider
} from "@/context"

import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
    <EventsProvider>
        <PortalProvider>
            <App/>
        </PortalProvider>
    </EventsProvider>
)
