// #region imports
import { _ACCOUNT_URL } from "@/constants"

import {
	_GET,
	IResponse,
} from "@/lib/api/utils"

import {
	IAccount,
	IRawAccount,
	serializeAccount,
} from "@/lib/types"
// #endregion

export const getProfile = async():
Promise<IResponse<IAccount>> => {

	const res = await _GET<IRawAccount>(
		_ACCOUNT_URL,{},
		{ withAuth: true },
	)

	if (res.success && res.data) {
		return {
			success: true,
			data: serializeAccount(
				res.data,
			),
		}
	}

	return {
		success: false,
		error: res.error,
	}
}