// #region imports
import {
	Information
} from "@/icons"
// #endregion

const InformationCard = ({
	description,
    styles,
}:{
	description: string
    styles?: string
}) => {
	return (
		<aside
			className={`
                rounded-2xl bg-purple-100 p-2 px-4
                flex items-start gap-4 font-medium
                justify-center max-w-full ${styles}
            `}
		>
			<div
				className="py-0.5"
			>
				<Information/>
			</div>

			<p
				className="text-purple-200 text-sm desktop:text-base"
			>
				{description}
			</p>
		</aside>
	)
}

export default InformationCard
