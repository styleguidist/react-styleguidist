/* eslint-disable no-console */

const puppeteer = require('puppeteer');
const path = require('path');

const args = process.argv.slice(2);

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({ width: 1024, height: 768 });
	page.on('error', async err => {
		console.error(err.stack);
		await browser.close();
		process.exit(1);
	});
	page.on('console', (...args) => console.log('PAGE LOG:', ...args));

	const url = /https?/.test(args[0]) ? args[0] : `file://${path.resolve(args[0])}`;
	await page.goto(url);

	if (args[1]) {
		await page.screenshot({ path: args[1] });
	}

	await browser.close();
})().catch(err => {
	console.error('Browser error', err);
});
