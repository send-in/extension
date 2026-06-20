// #region imports
import { _TIMEZONE_URL } from "@/constants"

import { 
    IRawTimezone, 
    ITimezone, 
    serializeTimezone 
} from "@/lib/types"

import {
    _POST,
    IResponse,
} from "@/lib/api"
// #endregion

export const getTimezone = async (
    location: string,
): Promise<IResponse<ITimezone>> => {
    const res = await _POST<IRawTimezone>(
        _TIMEZONE_URL, {},
        { 
            withAuth: true,
            body: JSON.stringify({
				location
			}),
        },
    )

    if (res.success && res.data) {
        return {
            success: true,
            data: serializeTimezone(res.data),
        }
    }

    return {
        success: false,
        error: res.error,
    }
}