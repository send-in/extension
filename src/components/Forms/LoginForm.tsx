// #region imports
import { Button } from "@/base"
import { _APP_URL } from "@/constants"
import { useAuthorized } from "@/hooks"
import { redirect } from "react-router-dom"
// #endregion


export const LoginForm = () => {
    const { authorized } = useAuthorized()

    if(authorized)
        redirect("/messages")

	return (
		<>
			<section
				className="
					w-full h-full flex flex-col
					gap-8 rounded-2xl items-center
					bg-blue-100  justify-center
                    text-white
				"
			>
                    <aside className="
                        flex flex-col 
                        items-center
                    ">
                        <p className="
                            text-2xl font-semibold mt-1
                        ">
                            Your session has expired
                        </p>
                        <p>
                            Sign in again to continue 😭
                        </p>
                    </aside>

                    <Button
                        type="submit"
                        size="sm"
                        variant="inverted"
                        className="py-1!"
                        textClassName="font-semibold"
                        onClick={()=>{
                            chrome.tabs.create({url: `${_APP_URL}/auth`})
                        }}
                    >
                        Login
                    </Button>

			</section>
		</>
	)
}