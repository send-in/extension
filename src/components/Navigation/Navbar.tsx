"use client"

// #region Imports
import {
    Link,
    useLocation,
} from "react-router-dom"

import { _APP_URL } from "@/constants"

import { Logo } from "@/icons"
import { Button } from "@/base"
// #endregion

const linkClass = `
    hover:text-white
    text-white/60 smooth cursor-pointer 
    data-[selected=true]:text-white
` 

const links = [
	{
		href: "/messages",
		label: "Messages",
        type: "internal"
	},
	{
		href: "/templates",
		label: "Templates",
        type: "internal"
	},
    {
		href: `${_APP_URL}/profile`,
		label: "Account",
        type: "external"
	},
    {
		href: `${_APP_URL}/profile/subscription`,
		label: "Subscription",
        type: "external"
	}
]

interface INavbar {
    name?: string
    picture?: string
}

export const Navbar = ({
    name = "",
    picture = ""
}: INavbar) => {
    const { pathname } = useLocation()

	return (
		<nav
			className="
				w-full flex items-end
                gap-10 z-100 justify-between
                font-medium text-charcoal-200
			"
		>
            <section className="flex gap-2 items-center">
                <img
                    className="rounded-full h-14 w-14 mt-2 ml-2"
                    alt={name || "SendIn"}
                    src={picture || "/profile.svg"}
                /> 

                <aside className="
                    text-xl text-blue-100
                    flex flex-col items-start
                ">
                    <p>{name || "SendIn"}</p>
                     <Button
                        size="xs"
                        startIcon={<Logo size={20}/>}
                        onClick={() => {
                            chrome.tabs.create({
                                url: _APP_URL
                            })
                        }}
                    >
                        Dashboard
                    </Button>
                </aside>
            </section>

            <section className="
                py-2 px-4 w-[50%] flex
                items-center z-100 justify-between 
                rounded-full bg-blue-100 text-sm
            ">
                {links.map((
                    {
                        href,
                        label,
                        type
                    }) => (
                    type === "external" ?
                    <p
                        key={href}
                        className={linkClass}
                        data-selected={href === pathname}
                        onClick={() => {
                            chrome.tabs.create({url: href})
                        }}
                    >
                        {label}   
                    </p> :
                    <Link
                        key={href}
                        to={href}
                        data-selected={href === pathname}
                        className={linkClass}
                    >
                        {label}
                    </Link>
                ))}
            </section>

		</nav>
	)
}
