#!/usr/bin/env node
'use strict';
/* eslint-disable no-console */

const minimist = require('minimist');
const chalk = require('chalk');
const ora = require('ora');
const stringify = require('q-i').stringify;
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils');
const logger = require('glogg')('rsg');
const getConfig = require('../scripts/config');
const setupLogger = require('../scripts/logger');
const consts = require('../scripts/consts');
const StyleguidistError = require('../scripts/utils/error');

const argv = minimist(process.argv.slice(2));
const command = argv._[0];

// Do not show nasty stack traces for Styleguidist errors
process.on('uncaughtException', err => {
	if (err.code === 'EADDRINUSE') {
		printErrorWithLink(
			`You have another server running at port ${config.serverPort} somewhere, shut it down first`,
			'You can change the port using the `serverPort` option in your style guide config:',
			consts.DOCS_CONFIG
		);
	} else if (err instanceof StyleguidistError) {
		console.error(chalk.bold.red(err.message));
		logger.debug(err.stack);
	} else {
		console.error(err.toString());
		console.error(err.stack);
	}
	process.exit(1);
});

// Make sure user has webpack installed
require('../scripts/utils/ensureWebpack');

// Set environment before loading style guide config because user’s webpack config may use it
const env = command === 'build' ? 'production' : 'development';
process.env.NODE_ENV = process.env.NODE_ENV || env;

// Load style guide config
let config;
try {
	config = getConfig(argv.config, updateConfig);
} catch (err) {
	if (err instanceof StyleguidistError) {
		printErrorWithLink(
			err.message,
			err.extra + '\n\n' + 'Learn how to configure your style guide:',
			consts.DOCS_CONFIG
		);
		process.exit(1);
	} else {
		throw err;
	}
}

verbose('Styleguidist config:', config);

switch (command) {
	case 'build':
		commandBuild();
		break;
	case 'server':
		commandServer();
		break;
	default:
		commandHelp();
}

/**
 * @param {object} config
 * @return {object}
 */
function updateConfig(config) {
	// Set verbose mode from config option or command line switch
	config.verbose = config.verbose || argv.verbose;

	// Setup logger *before* config validation (because validations may use logger to print warnings)
	setupLogger(config.logger, config.verbose);

	return config;
}

function commandBuild() {
	console.log('Building style guide...');

	const build = require('../scripts/build');
	const compiler = build(config, err => {
		if (err) {
			console.error(err);
			process.exit(1);
		} else {
			console.log('Style guide published to:\n' + chalk.underline(config.styleguideDir));
		}
	});

	verbose('Webpack config:', compiler.options);

	// Custom error reporting
	compiler.plugin('done', function(stats) {
		const messages = formatWebpackMessages(stats.toJson({}, true));
		const hasErrors = printAllErrorsAndWarnings(messages, stats.compilation);
		if (hasErrors) {
			process.exit(1);
		}
	});
}

function commandServer() {
	let spinner;

	const server = require('../scripts/server');
	const compiler = server(config, err => {
		if (err) {
			console.error(err);
		} else {
			const isHttps = compiler.options.devServer && compiler.options.devServer.https;
			printInstructions(isHttps, config.serverHost, config.serverPort);
		}
	});

	verbose('Webpack config:', compiler.options);

	// Show message when webpack is recompiling the bundle
	compiler.plugin('invalid', function() {
		console.log();
		spinner = ora('Compiling...').start();
	});

	// Custom error reporting
	compiler.plugin('done', function(stats) {
		if (spinner) {
			spinner.stop();
		}

		const messages = formatWebpackMessages(stats.toJson({}, true));

		if (!messages.errors.length && !messages.warnings.length) {
			printStatus('Compiled successfully!', 'success');
		}

		printAllErrorsAndWarnings(messages, stats.compilation);
	});
}

function commandHelp() {
	console.log(
		[
			chalk.underline('Usage'),
			'',
			'    ' +
				chalk.bold('styleguidist') +
				' ' +
				chalk.cyan('<command>') +
				' ' +
				chalk.yellow('[<options>]'),
			'',
			chalk.underline('Commands'),
			'',
			'    ' + chalk.cyan('build') + '           Build style guide',
			'    ' + chalk.cyan('server') + '          Run development server',
			'    ' + chalk.cyan('help') + '            Display React Styleguidist help',
			'',
			chalk.underline('Options'),
			'',
			'    ' + chalk.yellow('--config') + '        Config file path',
			'    ' + chalk.yellow('--verbose') + '       Print debug information',
		].join('\n')
	);
}

/**
 * @param {boolean} isHttps
 * @param {string} host
 * @param {number} port
 */
function printInstructions(isHttps, host, port) {
	const urls = webpackDevServerUtils.prepareUrls(isHttps ? 'https' : 'http', host, port);
	console.log(`You can now view your style guide in the browser:`);
	console.log();
	console.log(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`);
	console.log(`  ${chalk.bold('On your network:')}  ${urls.lanUrlForTerminal}`);
	console.log();
}

/**
 * @param {string} message
 * @param {string} linkTitle
 * @param {string} linkUrl
 */
function printErrorWithLink(message, linkTitle, linkUrl) {
	console.error(`${chalk.bold.red(message)}\n\n${linkTitle}\n${chalk.underline(linkUrl)}\n`);
}

/**
 * @param {string} header
 * @param {object} errors
 * @param {object} originalErrors
 * @param {'success'|'error'|'warning'} type
 */
function printErrors(header, errors, originalErrors, type) {
	printStatus(header, type);
	console.error();
	const messages = argv.verbose ? originalErrors : errors;
	messages.forEach(message => {
		console.error(message.message || message);
	});
}

/**
 * @param {string} text
 * @param {'success'|'error'|'warning'} type
 */
function printStatus(text, type) {
	if (type === 'success') {
		console.log(chalk.inverse.bold.green(' DONE ') + ' ' + text);
	} else if (type === 'error') {
		console.error(chalk.reset.inverse.bold.red(' FAIL ') + ' ' + chalk.reset.red(text));
	} else {
		console.error(chalk.reset.inverse.bold.yellow(' WARN ') + ' ' + chalk.reset.yellow(text));
	}
}

/**
 * @param {object} messages
 * @param {object} compilation
 * @return {boolean}
 */
function printAllErrorsAndWarnings(messages, compilation) {
	// If errors exist, only show errors
	if (messages.errors.length) {
		printAllErrors(messages.errors, compilation.errors);
		return true;
	}

	// Show warnings if no errors were found
	if (messages.warnings.length) {
		printAllWarnings(messages.warnings, compilation.warnings);
	}

	return false;
}

/**
 * @param {object} errors
 * @param {object} originalErrors
 */
function printAllErrors(errors, originalErrors) {
	printStyleguidistError(errors);
	printNoLoaderError(errors);
	printErrors('Failed to compile', errors, originalErrors, 'error');
}

/**
 * @param {object} warnings
 * @param {object} originalWarnings
 */
function printAllWarnings(warnings, originalWarnings) {
	printErrors('Compiled with warnings', warnings, originalWarnings, 'warning');
}

/**
 * @param {object} errors
 */
function printStyleguidistError(errors) {
	const styleguidistError = errors.find(message =>
		message.includes('Module build failed: Error: Styleguidist:')
	);
	if (!styleguidistError) {
		return;
	}

	const m = styleguidistError.match(/Styleguidist: (.*?)\n/);
	printErrorWithLink(m[1], 'Learn how to configure your style guide:', consts.DOCS_CONFIG);
	process.exit(1);
}

/**
 * @param {object} errors
 */
function printNoLoaderError(errors) {
	if (argv.verbose) {
		return;
	}

	const noLoaderError = errors.find(message =>
		message.includes('You may need an appropriate loader')
	);
	if (!noLoaderError) {
		return;
	}

	printErrorWithLink(
		noLoaderError,
		'Learn how to add webpack loaders to your style guide:',
		consts.DOCS_WEBPACK
	);
	process.exit(1);
}

/**
 * @param {string} header
 * @param {object} object
 */
function verbose(header, object) {
	logger.debug(chalk.bold(header) + '\n\n' + stringify(object));
}
