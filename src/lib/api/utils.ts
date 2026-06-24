import { _ORIGIN_URL } from "@/constants"

export interface IResponse<T> {
    data?: T
    success: boolean
    error?: string
	total?: number
	page?: number
}

interface IRequestOptions extends RequestInit {
    withAuth?: boolean
}

const _parseParams = (
    params?: Record<string, unknown>
): string => {
    if (!params)
        return ""

    const search = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return
        }

        if (Array.isArray(value)) {
            value.forEach(item => {
                search.append(
                    key,
                    String(item)
                )
            })

            return
        }

        search.append(
            key,
            String(value)
        )
    })

    const query = search.toString()

    return query
        ? `?${query}`
        : ""
}

const _request = async <T>(
    url: string,
    options?: IRequestOptions
): Promise<IResponse<T>> => {
    try {
        const {
            withAuth,
            ...rest
        } = options || {}

        const headers: Record<string, string> = {
            ...(rest?.headers as
                Record<string, string> |
                undefined
            )
        }

        if (withAuth) {
            const cookies = await chrome.cookies.getAll({
                url: _ORIGIN_URL,
            })
            headers["Cookie"] = cookies
                .map(cookie => `${cookie.name}=${cookie.value}`)
                .join("; ")   
        }

        const request = await fetch(
            url,
            {
                ...rest,
                headers,
                cache: "no-store",
                credentials: "include"
            }
        )

        const isJson = request.headers
        ?.get("content-type")
        ?.includes("application/json")

        let response: any = null
        if(isJson){
            try { response = await request.json() }
            catch(e){
                console.error(e)
            }
        }

        if(request.ok){
            return {
                success: true,
                data: response?.data,
                total: response?.total,
                page: response?.page,
            }
        }

        return {
            success: false,
            error:
                response?.error ||
                response?.message ||
                request.statusText ||
                "Unknown error"
        }

    }
    catch(e){
        console.error(e)
        return {
            success: false,
            error:
                e instanceof Error
                    ? e.message
                    : "Unknown error"
        }
    }
}

export const _GET = async <T>(
    url: string,
    query?: Record<string, unknown>,
    options?: IRequestOptions
): Promise<IResponse<T>> => {
    const finalUrl = `${url}${_parseParams(query)}`
    return _request<T>(
        finalUrl,
        {
            ...options,
            method: "GET"
        }
    )
}

export const _POST = async <T>(
    url: string,
    query?: Record<string, unknown>,
    options?: IRequestOptions
): Promise<IResponse<T>> => {
	const finalUrl = `${url}${_parseParams(query)}`
    const isFormData = options?.body instanceof FormData
    
    const headers = {
        ...(
            isFormData ? {} : 
            {"Content-Type": "application/json"}
        ),
        "accept": "application/json",
    }

    return _request<T>(
        finalUrl,
        {
            ...options,
		    headers,
			method: "POST"
        }
    )
}

export const _PUT = async <T>(
    url: string,
    query?: Record<string, unknown>,
    options?: IRequestOptions
): Promise<IResponse<T>> => {
	const finalUrl = `${url}${_parseParams(query)}`
    return _request<T>(
        finalUrl,
        {
            ...options,
            method: "PUT",
        }
    )
}

export const _PATCH = async <T>(
    url: string,
    query?: Record<string, unknown>,
    options?: IRequestOptions
): Promise<IResponse<T>> => {
	const finalUrl = `${url}${_parseParams(query)}`
    const isFormData = options?.body instanceof FormData
    
    const headers = {
        ...(
            isFormData ? {} : 
            {"Content-Type": "application/json"}
        ),
        "accept": "application/json",
    }

    return _request<T>(
        finalUrl,
        {
            ...options,
            headers,
            method: "PATCH",
        }
    )
}

export const _DELETE = async <T>(
    url: string,
    query?: Record<string, unknown>,
    options?: IRequestOptions
): Promise<IResponse<T>> => {
	const finalUrl = `${url}${_parseParams(query)}`
    return _request<T>(
        finalUrl,
        {
            ...options,
            method: "DELETE",
        }
    )
}