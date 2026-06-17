"use client"

// #region imports
import { useState } from "react"
import { Link } from "react-router-dom"

import { DashboardCard } from "@/components"
import { parseLexicalHTML } from "@/utils"
import { IMessage } from "@/lib"
import { Search } from "@/icons"

import {
	Button,
	TextField,
} from "@/base"
// #endregion

interface IMessageFormProps {
	messages: IMessage[]
	total?: number
	page?: number
	sort?: string
	q?: string
}

export const MessageForm = ({
	messages,
	// total,
	// page,
	// sort,
	q,
}: IMessageFormProps) => {

	const [message, setMessage] = useState<IMessage | undefined>(messages?.[0])

	return (
		<>
			<section
				data-length={messages.length > 0}
				className="
					w-[45%] h-full flex flex-col
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
                            justify-between gap-12
                        ">
                            <TextField
                                defaultValue={q}
                                fullWidth
                                size="sm"
                                className="text-black!"
                                variant="filled"
                                placeholder="Search"
                                // onKeyDown={(e) => {
                                //     if (e.key === "Enter") {
                                //         e.currentTarget.blur()

                                //         updateQuery(
                                //             "q",
                                //             e.currentTarget.value
                                //         )
                                //     }
                                // }}
                                // onBlur={(e)=>
                                //     updateQuery(
                                //         "q",
                                //         e.target.value
                                //     )
                                // }
                                endIcon={<Search/>}
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
                                                selected={(item.id === message?.id)}
                                                onClick={()=>
                                                    setMessage(item)
                                                }
                                            />
                                    )
                                }
                            </aside>
{/* 
                            {
                                !!total && total > 11 &&
                                <Pagination
                                    page={Number(page) || 1}
                                    count={Number(total)}
                                />
                            } */}
                        </section> 
                    </>:
                    <section className="flex flex-col items-center gap-2">
                        <p className="
                            text-xl text-blue-100 font-semibold
                        ">
                            No messages found 📭
                        </p>

                        <Link to="https://sendin.com/connections">
                            <Button
                                size="xs"
                                variant="primary"
                            >
                                Schedule Message
                            </Button>
                        </Link>
                    </section>
				}
			</section>

			<section
				className="
					flex flex-col gap-4
					w-[45%] h-full
				"
			>
				<article className="
                    bg-bluewash w-[55%] h-full
                    rounded-xl p-6
                ">
                    <aside
                        className="
                            flex flex-col gap-2
                            w-full h-full
                        "
                        dangerouslySetInnerHTML={{
                            __html: parseLexicalHTML(
                                message?.message ??
                                message?.template?.value
                            ),
                        }}
                    />
                </article>

			</section>
		</>
	)
}