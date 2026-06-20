// #region imports
import { _MESSAGES_URL } from "@/constants"
import { parseFilters } from "@/lib/common"

import {
	_GET,
	IResponse,
} from "@/lib/api/utils"

import {
	IMessage,
	IRawMessage,
	serializeMessage,
} from "@/lib/types"
// #endregion

export const getMessages = async(
    params?: Record<string, unknown>
): Promise<IResponse<IMessage[]>> => {
	const res = await _GET<IRawMessage[]>(
		_MESSAGES_URL,
        { ...parseFilters(params) },
		{ withAuth: true },
	)

	if (res.success && res.data) {
		return {
			success: true,
            total: res?.total ?? 0,
            page: res.page ?? 1,
			data: res.data.map(
				serializeMessage,
			),
		}
	}

	return {
		success: false,
		error: res.error,
	}
}