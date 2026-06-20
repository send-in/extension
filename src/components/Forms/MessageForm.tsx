"use client"

// #region imports
import { 
    useEffect,
    useState 
} from "react"

import { Search } from "@/icons"
import { DashboardCard } from "@/components"
import { parseLexicalHTML } from "@/utils"
import { useSearchParams } from "react-router-dom"

import { 
    getMessages,
    IMessage 
} from "@/lib"

import {
	Button,
	Pagination,
	TextField,
} from "@/base"
// #endregion


export const MessageForm = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") ?? 1)
    const q = searchParams.get("q") ?? ""

    const [total, setTotal] = useState(0)
    const [messages, setMessages] =  useState<IMessage[]>([])
	const [selected, setSelected] = 
        useState<IMessage | undefined>(messages?.at(0))

    useEffect(() => {
        (async () => {
            const {data, total = 0} = await getMessages({ 
                limit: 5,
                page,
                q
            })

            if(data){
                setMessages(data)
                setSelected(data?.at(0))
                setTotal(total)
            }
        })()
    }, [page, q])

    const searchQuery = (value?: string) => {
        const params = new URLSearchParams(searchParams)
        if (value === undefined || value === "") {
            params.delete("q")
        } else {
            params.set("q", String(value))
        }

        params.set("page", "1")
        setSearchParams(params)
    }

	return (
		<>
			<section
				data-length={messages.length > 0}
				className="
					w-[50%] h-full flex flex-col
					items-start gap-2 peer rounded-2xl

					data-[length=false]:bg-bluewash 
					data-[length=false]:justify-center
					data-[length=false]:items-center
					data-[length=false]:h-full
				"
			>
				{
                    messages && messages.length > 0 ?
                    <>
                        <section className="
                            w-full flex items-center 
                            justify-between gap-10
                        ">
                            <TextField
                                defaultValue={q}
                                fullWidth
                                size="sm"
                                className="text-black!"
                                variant="filled"
                                placeholder="Search"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur()
                                        searchQuery(e.currentTarget.value)
                                    }
                                }}
                                onBlur={(e)=>
                                    searchQuery(e.target.value)
                                }
                                endIcon={<Search size={16}/>}
                            />
                        </section>
                        <section className="
                            w-full h-full justify-between
                            flex flex-col items-end gap-2
                        ">
                            <aside className="
                                w-full h-full flex flex-col
                                gap-2 items-center
                            ">
                                {
                                    messages.map(
                                        (item, index) =>
                                            <DashboardCard
                                                key={index}
                                                data={item}
                                                selected={(item.id === selected?.id)}
                                                onClick={()=>
                                                    setSelected(item)
                                                }
                                            />
                                    )
                                }
                            </aside>

                            {
                                !!total && total > 1 &&
                                <Pagination
                                    className="w-max!"
                                    size="small"
                                    page={Number(page) || 1}
                                    count={Number(total)}
                                />
                            }
                        </section> 
                    </>:
                    <section className="flex flex-col items-center gap-2">
                        <p className="
                            text-lg text-blue-100 font-semibold
                        ">
                            No messages found 📭
                        </p>

                        <Button
                            size="xs"
                            variant="primary"
                            onClick={() => {
                                chrome.tabs.create({
                                    url: "https://sendin.com/connections",
                                })
                            }}
                        >
                            Schedule Message
                        </Button>
                    </section>
				}
			</section>

            <section className="
                bg-grey-100 w-[50%]
                rounded-xl p-4 h-80
                text-sm
            ">
                <aside
                    className="
                        flex flex-col gap-2
                        w-full max-h-full
                        overflow-y-scroll
                    "
                    dangerouslySetInnerHTML={{
                        __html: parseLexicalHTML(
                            selected?.message ??
                            selected?.template?.value
                        ),
                    }}
                />
            </section>

		</>
	)
}