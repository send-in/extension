export const SORT_OPTIONS = [
	{ label: "A-Z", value: "A-Z" },
	{ label: "Z-A", value: "Z-A" },
	{ label: "Recents", value: "Recents" },
]

export const parseFilters = (
    params?: {
        ids?: string[]
        q?: string
        limit?: number
        sort?: string
        page?: number
    }
): Record<string, unknown> => {

    if (!params)
        return {}

    const query: Record<string, unknown> = {}

    if (params.q)
        query.q = params.q

    if (params.limit)
        query.limit = params.limit

    if (params.page)
        query.page = params.page

    if (params.sort)
        query.sort = params.sort.toLowerCase()

    if (params.ids?.length)
        query.ids = params.ids

    return query
}

export const parseQuery = async (
  searchParams?: Promise<{
    page?: string
    sort?: string
    gender?: string
    flag?: string
    q?: string
    ids?: string[]
  }>
) => {
  const search = await searchParams

  return {
    page: Number(search?.page ?? 1),
    sort: search?.sort ?? "",
    gender: search?.gender ?? "",
    flag: search?.flag ?? "",
    q: search?.q ?? "",
    ids: search?.ids ?? []
  }
}