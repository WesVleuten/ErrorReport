import fs from 'fs';
import Koa from 'koa';
import KoaBody from 'koa-body'
import debug from 'debug';
import { AppConfig } from './models/appconfig';
import { SendgridSend } from './senders/sendgrid';

const log = debug('main');
log(`Startup`);

const config: AppConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
if (!config?.clientIdWhitelist?.length)
	throw new Error('Invalid config');

const app = new Koa();

app.use(KoaBody());

app.use(async (ctx) => {
	const body = ctx.request.body;
	if (!body.clientId || config.clientIdWhitelist.indexOf(body.clientId) == -1) {
		ctx.status = 400;
		return;
	}

	if (config.sendGrid == null) {
		ctx.status = 500;
		return;
	}

	const result = await SendgridSend(config, (<any>body));

	ctx.status = 200;
	ctx.body = JSON.stringify({
		success: result,
	});
});

app.listen(8080);

