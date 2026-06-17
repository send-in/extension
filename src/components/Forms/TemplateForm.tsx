"use client"

// #region imports
import { useState } from "react"
import { Link } from "react-router-dom"
import { parseLexicalHTML } from "@/utils"
import { Search } from "@/icons"
import { ITemplate } from "@/lib"
import { TemplateCard } from "@/components"

import { 
	Button, 
	IconButton,
    TextField
} from "@/base"
// #endregion

interface ITemplateForm {
    templates: ITemplate[]
    page?: number
    total?: number
	sort?: string
    q?: string
}

export const TemplateForm = ({
    templates,
    // page,
    // total,
	// sort,
    q,
}: ITemplateForm) => {
    const [selected, setSelected] = useState<ITemplate | undefined>(
        templates?.at(0)
    )

	return (
		<>
			<section
				data-length={(templates.length || 0) > 0}
				data-single={(templates.length || 0) < 10}
				className="
					flex flex-col gap-4 w-[45%] rounded-2xl 
					h-auto relative items-start group 
                    
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
                            justify-between gap-12
                        ">
                            <TextField
                                size="sm"
                                fullWidth
                                defaultValue={q}
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

                            {/* {
                                items && 
                                items?.length > 18 &&
                                <Pagination
                                    page={Number(page)}
                                    count={Number(total)}
                                />
                            } */}
                        </section>
                    </> :
                    <section className="flex flex-col items-center gap-2">
                        <p className="
                            text-xl text-blue-100 font-semibold
                        ">
                            Create your first template 📜
                        </p>

                        <Link to="https://sendin.com/templates">
                            <Button
                                size="xs"
                                variant="primary"
                            >
                                + Add Template
                            </Button>
                        </Link>
                    </section>
                }

				{
					!!templates?.length &&
                    <Link to="https://sendin.com/templates">
                        <IconButton
                            variant="neutral"
                            disabled={!templates?.length}
                            className="
                                absolute bottom-2 left-2 text-xl!
                                group-data-[single=true]:-bottom-15
                            "
                        >
                            +
                        </IconButton>
                    </Link>
				}


			</section>

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
                            selected?.value
                        ),
                    }}
                />
            </article>
		</>
	)
}