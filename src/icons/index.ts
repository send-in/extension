import { SVGProps } from "react"

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number
}

// #region Individual Icon Components
export { default as Information } from "./Information"
export { default as Refresh } from "./Refresh"
export { default as Chevron } from "./Chevron"
export { default as Search } from "./Seach"
export { default as Clock } from "./Clock"
export { default as Globe } from "./Globe"
export { default as GoTo } from "./GoTo"
export { default as Logo } from "./Logo"
export { default as Copy } from "./Copy"
export { default as Edit } from "./Edit"
// #endregion
