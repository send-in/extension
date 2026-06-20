// #region imports
import { ITemplate } from "@/lib"
// #endregion

export const TemplateCard = ({
	template,
	onChange,
	selected,
}:{
	template: ITemplate
	onChange?: (value: ITemplate) => void
	selected: boolean
}) => {
	return (
		<li
			className="
				list-none flex text-base items-center w-full
				min-h-10 py-1 px-2 rounded-xl text-grey-200
                justify-between smooth cursor-pointer border-2 border-white 
				bg-white hover:border-grey-100 active:border-grey-200 
                data-[selected=true]:border-blue-100
			"
			onClick={()=>onChange?.(template)}
			data-selected={selected}
		>
			<p className="shrink-0">
				{template.label}
			</p>
		</li>
	)
}
