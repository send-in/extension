// #region Imports
import {
    useState,
    useEffect
} from "react"

import { 
    _ACCESS_KEY, 
    _ORIGIN_URL 
} from "@/constants"
// #endregion

export const useAuthorized = () => {
    const [authorized, setAuthorized] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const cookie = await chrome.cookies.get({
                url: _ORIGIN_URL,
                name: _ACCESS_KEY,
            })

            setAuthorized(!!cookie.value)
        })()
    }, [chrome.cookies])

    return {
        authorized
    }
}
