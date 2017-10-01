/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const puppeteer = require('puppeteer');
const path = require('path');

const args = process.argv.slice(2);

let browser;

async function onerror(err) {
	console.error(err.stack);
	await browser.close();
	process.exit(1);
}

(async () => {
	browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({ width: 1024, height: 768 });
	page.on('error', onerror);
	page.on('pageerror', onerror);

	page.on('console', (...args) => console.log('PAGE LOG:', ...args));

	const url = /https?/.test(args[0]) ? args[0] : `file://${path.resolve(args[0])}`;
	await page.goto(url);

	if (args[1]) {
		await page.screenshot({ path: args[1] });
	}

	await browser.close();
})().catch(onerror);
