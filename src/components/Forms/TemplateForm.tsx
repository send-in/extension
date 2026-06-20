"use client"

// #region imports
import { 
    useEffect, 
    useState 
} from "react"

import { Search } from "@/icons"
import { TemplateCard } from "@/components"
import { parseLexicalHTML } from "@/utils"
import { useSearchParams } from "react-router-dom"

import { 
    getTemplates, 
    ITemplate 
} from "@/lib"

import { 
	Button, 
	IconButton,
    Pagination,
    TextField
} from "@/base"
// #endregion

export const TemplateForm = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") ?? 1)
    const q = searchParams.get("q") ?? ""

    const [total, setTotal] = useState(0)
    const [templates, setTemplates] = useState<ITemplate[]>([])
    const [selected, setSelected] = 
        useState<ITemplate | undefined>(templates?.at(0))
    
    useEffect(() => {
        (async () => {
            const {data, total = 0} = await getTemplates({ 
                limit: 5,
                page,
                q
            })

            if(data){
                setTemplates(data)
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
				data-length={(templates.length || 0) > 0}
				data-single={(templates.length || 0) < 10}
				className="
					flex flex-col gap-2 w-[50%] rounded-2xl 
					h-full relative items-start group 
                    
                    data-[length=false]:h-full
					data-[length=false]:justify-center 
                    data-[length=false]:items-center 
					data-[length=false]:bg-bluewash 
				"
			>
                {
                    templates && templates.length > 0 ? 
                    <>
                        <section className="
                            w-full flex items-center 
                            justify-between gap-10
                        ">
                            <TextField
                                size="sm"
                                fullWidth
                                defaultValue={q}
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
                                    !!templates?.length &&
                                    templates.map(
                                        (template, index) =>
                                            <TemplateCard
                                                key={index}
                                                template={template}
                                                selected={selected?.id === template.id}
                                                onChange={() => setSelected(template)}
                                            />
                                    )
                                }
                            </aside>

                            {
                                !!total && total > 1 &&
                                <Pagination
                                    className="w-max!"
                                    size="small"
                                    page={Number(page)}
                                    count={Number(total)}
                                />
                            }
                        </section>
                    </> :
                    <section className="flex flex-col items-center gap-2">
                        <p className="
                            text-lg text-blue-100 font-semibold
                        ">
                            Create your first template 📜
                        </p>

                        <Button
                            size="xs"
                            variant="primary"
                            onClick={() => {
                                chrome.tabs.create({
                                    url: "https://sendin.com/templates",
                                })
                            }}
                        >
                            + Add Template
                        </Button>
                    </section>
                }

				{
					!!templates?.length &&
                    <IconButton
                        variant="neutral"
                        disabled={!templates?.length}
                        className="absolute bottom-2 left-2 text-xl!"
                        onClick={() => {
                            chrome.tabs.create({
                                url: "https://sendin.com/templates",
                            })
                        }}
                    >
                        +
                    </IconButton>
				}


			</section>

			<section className="
                bg-grey-100 w-[50%]
                rounded-xl p-4 h-80
                text-sm
            ">
                <article
                    className="
                        flex flex-col gap-2
                        w-full h-full 
                        overflow-y-scroll
                    "
                    dangerouslySetInnerHTML={{
                        __html: parseLexicalHTML(
                            selected?.value
                        ),
                    }}
                />
            </section>
		</>
	)
}