import "@fontsource/mada/400.css"
import "@fontsource/mada/500.css"
import "@fontsource/mada/600.css"
import "@fontsource/mada/700.css"

import { createRoot } from "react-dom/client"

import "@/globals.css"
import {
    EventsProvider,
} from "@/context"

import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
    <EventsProvider>
        <main className="
            antialiased p-4 pt-2 bg-white
            h-102 w-160 tracking-tighter
            flex flex-col gap-4 font-mada 
            relative
        ">
            <App/>
        </main>
    </EventsProvider>
)
