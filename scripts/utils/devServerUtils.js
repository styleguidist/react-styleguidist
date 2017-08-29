'use strict';

const address = require('address');
const url = require('url');
const chalk = require('chalk');
const logger = require('glogg')('rsg');

function prepareUrls(protocol, host, port) {
	const formatUrl = hostname =>
		url.format({
			protocol,
			hostname,
			port,
			pathname: '/',
		});
	const prettyPrintUrl = hostname =>
		url.format({
			protocol,
			hostname,
			port: chalk.bold(port),
			pathname: '/',
		});

	const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
	let prettyHost;
	let lanUrlForConfig;
	let lanUrlForTerminal;
	if (isUnspecifiedHost) {
		prettyHost = 'localhost';
		try {
			// This can only return an IPv4 address
			lanUrlForConfig = address.ip();
			if (lanUrlForConfig) {
				// Check if the address is a private ip
				// https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
				if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
					// Address is private, format it for later use
					lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
				} else {
					// Address is not private, so we will discard it
					lanUrlForConfig = undefined;
				}
			}
		} catch (_e) {
			// ignored
		}
	} else {
		prettyHost = host;
	}
	const localUrlForTerminal = prettyPrintUrl(prettyHost);
	const localUrlForBrowser = formatUrl(prettyHost);
	return {
		lanUrlForConfig,
		lanUrlForTerminal,
		localUrlForTerminal,
		localUrlForBrowser,
	};
}

function printInstructions(protocol, host, port) {
	const urls = prepareUrls(protocol ? 'https' : 'http', host, port);
	logger.info(`You can now view style guide in the browser.`);

	if (urls.lanUrlForTerminal) {
		logger.info(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`);
		logger.info(`  ${chalk.bold('On your network:')}  ${urls.lanUrlForTerminal}`);
	} else {
		logger.info(`  ${urls.localUrlForTerminal}`);
	}

	logger.info('Note that the development build is not optimized.');
}

module.exports = {
	printInstructions,
	prepareUrls,
};
