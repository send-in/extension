// #region imports
import { _TEMPLATES_URL } from "@/constants"
import { parseFilters } from "@/lib/common"

import {
	_GET,
	IResponse,
} from "@/lib/api"

import {
	ITemplate,
	IRawTemplate,
	serializeTemplate,
} from "@/lib/types"
// #endregion

export const getTemplates = async(
    params?: Record<string, unknown>
): Promise<IResponse<ITemplate[]>> => {
	const res = await _GET<IRawTemplate[]>(
		_TEMPLATES_URL,
		{ ...parseFilters(params) },
		{ withAuth: true },
	)

	if (res.success && res.data) {
		return {
			success: true,
            total: res?.total ?? 0,
            page: res?.page ?? 1,
			data: res.data?.map(
				serializeTemplate,
			),
		}
	}

	return {
		success: false,
		error: res.error,
	}
}