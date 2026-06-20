import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
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
                content: path.resolve(__dirname, 'src/schedule.tsx'),
            },
            output: {
                entryFileNames: 'schedule.js',
                format: 'iife',
                inlineDynamicImports: true,
            },
        },
    },
})