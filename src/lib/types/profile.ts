
export interface IRawAccount {
	ID: string
	Name: string
	Email: string
	Profile: string
	Picture: string
	Timezone: string
	Token: string
	UserAgent: string
	Plan: string
	PlanCredits: number
	CreditsRemaining: number
	CreditsRenewAt?: string
	LastDailyResetAt?: string
	DailySyncsUsed: number
	DailySchedulesUsed: number
	LifetimeSyncsUsed: number
	LifetimeMessagesUsed: number
	CreatedAt: string
	UpdatedAt: string
}

export interface IAccount {
	id: string
	name: string
	email: string
	profile: string
	picture: string
	timezone: string
	token: string
	userAgent: string
	plan: string
	planCredits: number
	creditsRemaining: number
	renewAt?: Date
	dailyResetAt?: Date
	dailySyncsUsed: number
	dailySchedulesUsed: number
	lifetimeSyncsUsed: number
	lifetimeMessagesUsed: number
	createdAt: Date
	updatedAt: Date
}

export const serializeAccount = (
	account: IRawAccount,
): IAccount => ({
	id: account.ID,
	name: account.Name,
	email: account.Email,
	profile: account.Profile,
	picture: account.Picture,
	timezone: account.Timezone ?? "Asia/Kolkata",
	token: account.Token,
	userAgent: account.UserAgent,
	plan: account.Plan,
	planCredits: account.PlanCredits,
	creditsRemaining: account.CreditsRemaining,
	dailySyncsUsed: account.DailySyncsUsed,
	dailySchedulesUsed: account.DailySchedulesUsed,
	lifetimeSyncsUsed: account.LifetimeSyncsUsed,
	lifetimeMessagesUsed: account.LifetimeMessagesUsed,

	renewAt: account.CreditsRenewAt
		? new Date(account.CreditsRenewAt)
		: undefined,

	dailyResetAt: account.LastDailyResetAt
		? new Date(account.LastDailyResetAt)
		: undefined,

	createdAt: new Date(account.CreatedAt),
	updatedAt: new Date(account.UpdatedAt),
})