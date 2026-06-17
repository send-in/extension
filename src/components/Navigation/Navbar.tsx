"use client"

// #region Imports
import {
    Link,
    useLocation,
} from "react-router-dom"

import { Logo, Refresh } from "@/icons"
import { Button } from "@/base"
// #endregion

const links = [
	{
		href: "/messages",
		label: "Messages"
	},
	{
		href: "/templates",
		label: "Templates"
	},
    {
		href: "https://sendin.com/profile",
		label: "Account"
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
				px-2 w-full mb-4 flex items-end 
                gap-10 z-100 justify-between
                font-medium text-charcoal-200
                absolute top-2
			"
		>
            <section>
                {
                    picture ?
                    <img
                        className="rounded-full h-48 w-48 mt-2 ml-2"
                        alt={name || "SendIn"}
                        src={picture || "/profile.svg"}
                    /> :
                    <Logo 
                        size={60} 
                        className="fill-blue-100"
                    />
                }

                <aside className="
                    text-2xl text-blue-100
                    flex flex-col items-end
                ">
                    <p>{name || "SendIn"}</p>
                    <Button
                        
                        startIcon={<Refresh size={20}/>}
                        size="xs"
                    >
                        Reconnect
                    </Button>
                </aside>
            </section>

            <section className="
                py-2 pr-2 w-[60%] flex items-center 
                gap-2 z-100 justify-between 
                rounded-full bg-bluewash 
            ">
                <aside
                    className="flex gap-5 text-sm"
                >
                    {links.map((
                        {
                            href,
                            label
                        }) => (
                        <Link
                            key={href}
                            to={href}
                            data-selected={
                                href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(href)
                            }
                            className="
                                hover:text-charcoal-100 
                                text-grey-300 smooth cursor-pointer 
                                data-[selected=true]:text-charcoal-100
                            "
                        >
                            {label}
                        </Link>
                    ))}
                </aside>


                <Link to="https://sendin.com/">
                    <Button
                        size="xs"
                        startIcon={<Logo size={14}/>}
                    >
                        Dashboard
                    </Button>
                </Link>
            </section>

		</nav>
	)
}
