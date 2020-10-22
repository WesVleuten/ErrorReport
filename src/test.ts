import './index';
import fetch from 'node-fetch';

const errorExample = new Error('Hello World');
console.log(fetch);

const requestBody = JSON.stringify({
	clientId: 'wescloud-errortest',
	logType: 'error',
	exception: errorExample.name,
	message: errorExample.message,
	stacktrace: errorExample.stack,
});

fetch('http://localhost:8080/', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: requestBody,
}).then(res => res.json()).then(response => {
	console.log(response);
}).catch(error => {
	console.log(`Test error ${error}`);
});
