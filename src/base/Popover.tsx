"use client"

// #region imports
import {
	forwardRef,
	ReactNode,
	useState,
	useRef,
	useEffect
} from "react"

import {
	cn
} from "@/utils"
import { Portal } from "@/context"
// #endregion

export interface PopoverProps {
    trigger: ReactNode
    children: ReactNode
    className?: string
    modalOpen?: boolean
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    ({
		trigger,
		children,
        modalOpen = false,
		className = ""
	}, ref) => {
        const [open, setOpen] = useState<boolean>(modalOpen)
        const popoverRef = useRef<HTMLDivElement>(null)

        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [])

        useEffect(
            () => setOpen(modalOpen), 
            [modalOpen]
        )

        return (
            <div ref={ref} className="relative inline-block">
                <div onClick={() => setOpen(prev => !prev)}>
					{trigger}
				</div>

                {open && (
                    <Portal>
                        <div
                            className="
                                fixed inset-0 z-[1500] p-4
                                bg-black/20 backdrop-blur-sm
                                flex items-center justify-center
                            "
                        >
                            <div
                                ref={popoverRef}
                                className={cn(
                                    `
                                        bg-white rounded-3xl
                                        shadow-xl p-6
                                        max-w-xl w-full
                                        smooth animate-modal
                                    `,
                                    className,
                                )}
                            >
                                {children}
                            </div>
                        </div>
                    </Portal>
                )}
            </div>
        )
    }
)

Popover.displayName = "Popover"
export default Popover
