// #region imports
import { _TEMPLATES_URL } from "@/constants"
import { parseFilters } from "@/lib/common"

import {
	_GET,
	_POST,
    _PUT,
	_DELETE,
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

export const createTemplate = async(
	label: string,
	value: string,
): Promise<IResponse<ITemplate>> => {

	const res = await _POST<IRawTemplate>(
		_TEMPLATES_URL, {},
		{
			withAuth: true,
			body: JSON.stringify({
				label,
				value,
			}),
		},
	)

	if (res.success && res.data) {
		return {
			success: true,
			data: serializeTemplate(
				res.data,
			),
		}
	}

	return {
		success: false,
		error: res.error,
	}
}

export const updateTemplate = async(
	id: string,
	label: string,
	value: string,
): Promise<IResponse<ITemplate>> => {

	const res = await _PUT<IRawTemplate>(
		`${_TEMPLATES_URL}/${id}`,
		{},
		{
			withAuth: true,
			body: JSON.stringify({
				label,
				value,
			}),
		},
	)

	if (res.success && res.data) {
		return {
			success: true,
			data: serializeTemplate(
				res.data,
			),
		}
	}

	return {
		success: false,
		error: res.error,
	}
}

export const deleteTemplate = async(
	id: string,
): Promise<IResponse<boolean>> => {

	const res = await _DELETE(
		`${_TEMPLATES_URL}/${id}`, {},
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