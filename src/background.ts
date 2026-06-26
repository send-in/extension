// #region imports
import { 
    createMessage, 
    syncProfile 
} from "@/lib"
// #endregion

const syncLinkedin = async () => {
    const [token, jsession] = await Promise.all([
        chrome.cookies.get({
            url: "https://www.linkedin.com",
            name: "li_at",
        }),
        chrome.cookies.get({
            url: "https://www.linkedin.com",
            name: "JSESSIONID",
        }),
    ])

    await syncProfile({
        token: token?.value,
        session: jsession?.value.replace(/^"|"$/g, ""),
        userAgent: navigator.userAgent,
    })
}

(async () => 
    await syncLinkedin()
)()

chrome.runtime.onMessageExternal.addListener(async (request) => {
    if (request.action === "OPEN_POPUP") {
        chrome.action.openPopup()
        await syncLinkedin()
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "OPEN_POPUP") {
        chrome.action.openPopup()
    }
})

chrome.runtime.onMessage.addListener(async (message) => {
    if (message.action === "SEND_MESSAGE") {
        if(message?.payload){
            const {success, error} = await createMessage(
                message?.payload
            )

            if(success) 
                chrome.action.openPopup()
            
            if(error) 
                console.log(error)
        }
    }
})

chrome.cookies.onChanged.addListener(async ({ cookie }) => {
    if (
        cookie.domain.includes("linkedin.com") &&
        (
            cookie.name === "li_at" || 
            cookie.name === "JSESSIONID"
        )
    ) await syncLinkedin()
})