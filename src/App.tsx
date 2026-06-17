import { useEffect, useState } from "react"

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom"

import {
    Navbar,
    MessageForm,
    TemplateForm,
} from "@/components"

import {
    getMessages,
    getProfile,
    getTemplates,
} from "@/lib"

import type {
    IAccount,
    IMessage,
    ITemplate,
} from "@/lib"

const DashboardPage = () => {
    const [account, setAccount] = useState<IAccount>()
    const [messages, setMessages] = useState<IMessage[]>([])
    const [templates, setTemplates] = useState<ITemplate[]>([])

    useEffect(() => {
        ;(async () => {
            const [
                accountRes,
                messagesRes,
                templatesRes,
            ] = await Promise.all([
                getProfile(),
                getMessages({ limit: 5 }),
                getTemplates({ limit: 5 }),
            ])

            setAccount(accountRes.data)
            setMessages(messagesRes.data ?? [])
            setTemplates(templatesRes.data ?? [])
        })()
    }, [])

    return (
        <BrowserRouter>
            <Navbar
                name={account?.name}
                picture={account?.picture}
            />

            <main
                className="
                    pt-[13%] h-full flex
                    text-grey-200 text-base
                    justify-between pr-2 gap-4
                "
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/messages"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/messages"
                        element={
                            <MessageForm
                                messages={messages}
                                total={messages.length}
                                page={1}
                                q=""
                            />
                        }
                    />

                    <Route
                        path="/templates"
                        element={
                            <TemplateForm
                                templates={templates}
                                total={templates.length}
                                page={1}
                                q=""
                            />
                        }
                    />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default DashboardPage