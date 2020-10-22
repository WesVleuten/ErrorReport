import fetch from 'node-fetch';
import { AppConfig } from '../models/appconfig';
import { IncomingException } from '../models/incomingexception';

export async function SendgridSend(config: AppConfig, incomingException: IncomingException): Promise<boolean> {
	if (config.sendGrid == null)
		return false;

	const subject = `${incomingException.clientId} ${incomingException.logType} ${incomingException.exception}`;
	const emailbody = `ClientId: ${incomingException.clientId}\nLogType: ${incomingException.logType}\nException: ${incomingException.exception}\nMessage: ${incomingException.message}\nStacktrace:\n${incomingException.stacktrace}\n`;

	const send = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${config.sendGrid.authorization}`,
		},
		body: JSON.stringify({
			'personalizations': [{
				'to': [{
					'email': config.sendGrid.toEmail,
				}],
				'subject': subject,
			}],
			'content': [{
				'type': 'text/plain',
				'value': emailbody,
			}],
			'from': {
				'email': config.sendGrid.fromEmail,
				'name': config.sendGrid.fromName,
			}
		}),
	});
	
	return send.status < 300;
};

