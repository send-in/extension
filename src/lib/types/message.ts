// #region imports
import { 
    IRawTemplate,
    ITemplate,
    serializeTemplate
} from "./template"
// #endregion

export interface IRawMessage {
	ID: string
	Name: string
	Picture?: string
	Profile: string
	Company?: string
	Timezone?: string
	Message?: string
	IsSent: boolean
	Template?: IRawTemplate
    TemplateID?: string
    ScheduleTime: string
    UpdatedAt: string
    CreatedAt: string
}

export interface IMessage {
	id: string
	name: string
	picture?: string
	profile: string
	company?: string
	timezone?: string
	isSent: boolean
	message?: string
    templateId?: string
	template?: ITemplate

    scheduledAt: string,
    createdAt: Date,
    updatedAt: Date,
}

export const serializeMessage = (
	message: IRawMessage,
): IMessage => ({
	id: message.ID,
	name: message.Name,
	picture: message.Picture,
	profile: message.Profile,
	company: message.Company,
	timezone: message.Timezone,
	message: message.Message,
	isSent: message.IsSent,

    templateId: message.TemplateID,
    scheduledAt: message.ScheduleTime,
    
    createdAt: new Date(message.CreatedAt),
    updatedAt: new Date(message.UpdatedAt),
	template: message.Template
		? serializeTemplate(message.Template)
		: undefined,
})