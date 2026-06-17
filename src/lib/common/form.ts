// #region imports
// #endregion

export type IFieldErrors<T> =
    Partial<Record<keyof T, string>>

export type IValidator<T> = {
    [K in keyof T]?: (value: T[K]) => string | null
}

export interface IFormResponse<T> {
    success: boolean
    errors?: Partial<Record<keyof T, string>>
	data?: Record<keyof T, string>
}

export const parseForm = <T>(formData: FormData): Record<keyof T, string> =>
	Object.fromEntries(
		Array.from(formData.entries(), ([key, value]) => [
			key,
			typeof value === "string" ? value : String(value),
		])
	) as Record<keyof T, string>

export const validateForm = <T>(
  data: T,
  rules: IValidator<T>
): IFieldErrors<T> | null => {

    const errors: IFieldErrors<T> = {}

    for (const key in rules) {
        const rule = rules[key]
        if (!rule) continue

        const error = rule(data[key])
        if (error)
            errors[key] = error
    }

    if (Object.keys(errors).length)
        return errors

    return null
}

export const requireField =
  (message: string) =>
  (value?: string | null) =>
    !value || value.trim() === ""
      ? message
      : null
