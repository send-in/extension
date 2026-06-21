import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

const entries = {
    background: "src/background.ts",
    schedule: "src/schedule.tsx",
    timezone: "src/timezone.tsx",
}

export default defineConfig(({ mode }) => {
    const input = entries[mode as keyof typeof entries]

    if (!input)
        throw new Error(`Unknown build mode: ${mode}`)

    const output = `${mode}.js`

    return {
        plugins: [
            react(),
            tailwindcss(),
        ],

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },

        build: {
            emptyOutDir: false,

            rollupOptions: {
                input: {
                    app: path.resolve(__dirname, input),
                },

                output: {
                    entryFileNames: output,
                    format: "iife",
                    inlineDynamicImports: true,
                },
            },
        },
    }
})