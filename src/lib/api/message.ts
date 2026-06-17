// #region imports
import { _MESSAGES_URL } from "@/constants"
import { parseFilters } from "@/lib/common"

import {
	_GET,
	_POST,
	_DELETE,
	IResponse,
    _PUT,
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

export const createMessage = async(
	payload: {
		name: string
		profile: string
		picture?: string
		company?: string
		timezone?: string
		message?: string
		templateId?: string
	}[],
): Promise<IResponse<boolean>> => {
    console.log(payload)
	const res = await _POST(
		_MESSAGES_URL,{},
		{
			withAuth: true,
			body: JSON.stringify(payload),
		},
	)

	if (res.success) {
		return {
			success: true,
			data: true,
		}
	}

	return {
		success: false,
		error: res.error,
	}
}

export const updateMessage = async(
	id: string,
	payload: {
		timezone?: string
		message?: string
		templateId?: string
		scheduleTime?: string
	},
): Promise<IResponse<IMessage>> => {
	const res = await _PUT<IRawMessage>(
		`${_MESSAGES_URL}/${id}`,
		{},
		{
			withAuth: true,
			body: JSON.stringify({
				timezone: payload.timezone,
				message: payload.message,
				templateId: payload.templateId,
				scheduleTime: payload.scheduleTime,
			}),
		},
	)

	if (res.success && res.data) {
		return {
			success: true,
			data: serializeMessage(
				res.data,
			),
		}
	}

	return {
		success: false,
		error: res.error,
	}
}

export const deleteMessage = async(
	id: string,
): Promise<IResponse<boolean>> => {

	const res = await _DELETE(
		`${_MESSAGES_URL}/${id}`,{},
		{
			withAuth: true,
		},
	)

	if (res.success) {
		return {
			success: true,
			data: true,
		}
	}

	return {
		success: false,
		error: res.error,
	}
}