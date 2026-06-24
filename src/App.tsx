// #region imports
import { 
    useEffect, 
    useState 
} from "react"

import {
    HashRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom"

import { 
    getProfile, 
    IAccount 
} from "@/lib"

import {
    Navbar,
    LoginForm,
    MessageForm,
    TemplateForm,
    Protected,
} from "@/components"
// #endregion


const DashboardPage = () => {
    const [account, setAccount] = useState<IAccount>()

    useEffect(() => {
        (async () => {
            const {data} = await getProfile()
            if(data) setAccount(data)
        })()
    }, [])

    return (
        <HashRouter>
            <Navbar
                name={account?.name}
                picture={account?.picture}
            />

            <article
                className="
                    h-full flex text-grey-200 text-base
                    justify-between p-2 gap-4
                "
            >
                <Routes>
                    <Route path="/login"
                        element={
                           <LoginForm/>
                        }
                    />
                    
                    <Route element={<Protected />}>
                        <Route path="/"
                            element={
                            <Navigate
                                    to="/messages"
                                />
                            }
                        />


                        <Route path="/messages"
                            element={
                                <MessageForm/>
                            }
                        />

                        <Route path="/templates"
                            element={
                                <TemplateForm/>
                            }
                        />
                    </Route>
                </Routes>
            </article>
        </HashRouter>
    )
}

export default DashboardPage