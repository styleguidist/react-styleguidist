/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const puppeteer = require('puppeteer');
const path = require('path');

const args = process.argv.slice(2);

let browser;

process.on('unhandledRejection', (reason) => {
	console.log('Unhandled Promise rejection:', reason);
	if (browser) {
		browser.close().then(() => process.exit(1));
	}
	process.exit(1);
});

async function onerror(err) {
	console.error(err.stack);
	if (browser) {
		await browser.close();
	}
	process.exit(1);
}

(async () => {
	browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
	const page = await browser.newPage();
	await page.setViewport({ width: 1024, height: 768 });
	page.on('error', onerror);
	page.on('pageerror', onerror);

	page.on('console', (msg) => {
		if (msg.type() !== 'clear') {
			console.log('PAGE LOG:', msg.text());
		}
	});

	const url = /https?/.test(args[0]) ? args[0] : `file://${path.resolve(args[0])}`;
	await page.goto(url);

	if (args[1]) {
		await page.screenshot({ path: args[1] });
	}

	await browser.close();
})().catch(onerror);
