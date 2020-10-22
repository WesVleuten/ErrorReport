
export interface AppConfigSendGrid {
	priority: number;
	authorization: string;
	fromEmail: string;
	fromName: string;
	toEmail: string;
}

export interface AppConfig {
	clientIdWhitelist: string[];
	sendGrid: AppConfigSendGrid|null;
}
