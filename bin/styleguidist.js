#!/usr/bin/env node

'use strict';

/* eslint-disable no-console */

const minimist = require('minimist');
const chalk = require('chalk');
const prettyFormat = require('pretty-format');
const getConfig = require('../scripts/config');
const consts = require('../scripts/consts');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const StyleguidistError = require('../scripts/utils/error');

function printErrorWithLink(message, linkTitle, linkUrl) {
	console.error(chalk.bold.red(message));
	console.log();
	console.log(linkTitle);
	console.log(chalk.underline(linkUrl));
	console.log();
}

function printWebpackConfigFile(webpackConfigFile) {
	if (webpackConfigFile) {
		console.log('Loading Webpack config from:\n', webpackConfigFile);
		console.log();
	}
}

function printErrors(header, errors, originalErrors, printer) {
	console.log(printer(header));
	console.log();
	const messages = argv.verbose ? originalErrors : errors;
	messages.forEach(message => {
		console.log(message.message || message);
		console.log();
	});
}

function printStyleguidistError(errors) {
	const styleguidistError = errors.find(message => message.includes('Module build failed: Error: Styleguidist:'));
	if (!styleguidistError) {
		return;
	}

	const m = styleguidistError.match(/Styleguidist: (.*?)\n/);
	printErrorWithLink(
		m[1],
		'Learn how to configure your style guide:',
		consts.DOCS_CONFIG
	);
	process.exit(1);
}

function printCompilationDone(stats, isServer) {
	isServer = isServer || false;
	const messages = formatWebpackMessages(stats.toJson({}, true));

	if (isServer && !messages.errors.length && !messages.warnings.length) {
		console.log(chalk.green('Compiled successfully!'));
		console.log();
	}

	// If errors exist, only show errors.
	if (messages.errors.length) {
		printStyleguidistError(messages.errors);
		printErrors('Failed to compile.', messages.errors, stats.compilation.errors, chalk.red);
		return;
	}

	// Show warnings if no errors were found.
	if (messages.warnings.length) {
		printErrors('Compiled with warnings.', messages.warnings, stats.compilation.warnings, chalk.yellow);
	}
}

function verbose(header, object) {
	/* istanbul ignore if */
	if (argv.verbose) {
		console.log();
		console.log(chalk.bold(header));
		console.log(prettyFormat(object));
		console.log();
	}
}

const argv = minimist(process.argv.slice(2));

let config;
try {
	config = getConfig(argv.config);
}
catch (err) {
	if (err instanceof StyleguidistError) {
		printErrorWithLink(
			err.message,
			err.extra + '\n\n' +
			'Learn how to configure your style guide:',
			consts.DOCS_CONFIG
		);
		process.exit(1);
	}
	else {
		throw err;
	}
}

verbose('Styleguidist config:', config);
config.verbose = argv.verbose;

switch (argv._[0]) {
	case 'build':
		commandBuild();
		break;
	case 'server':
		commandServer();
		break;
	default:
		commandHelp();
}

function commandBuild() {
	console.log('Building style guide...');

	const build = require('../scripts/build');
	const compiler = build(config, err => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		else {
			console.log('Style guide published to:');
			console.log(chalk.underline(config.styleguideDir));
		}
	});

	printWebpackConfigFile(config.webpackConfigFile);
	verbose('Webpack static config:', compiler.compilers[0].options);
	verbose('Webpack client config:', compiler.compilers[1].options);

	// Custom error reporting
	compiler.plugin('done', function(multiStats) {
		multiStats.stats.forEach(stats => printCompilationDone(stats, false));
	});
}

function commandServer() {
	process.on('uncaughtException', err => {
		if (err.code === 'EADDRINUSE') {
			printErrorWithLink(
				`You have another server running at port ${config.serverPort} somewhere, shut it down first`,
				'You can change the port using the `serverPort` option in your style guide config:',
				consts.DOCS_CONFIG
			);
		}
		else {
			console.error(chalk.bold.red(err.message));
			/* istanbul ignore if */
			if (argv.verbose) {
				console.log();
				console.log(err.stack);
			}
		}
		process.exit(1);
	});

	const server = require('../scripts/server');
	const compiler = server(config, err => {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Style guide server started at:');
			console.log(chalk.underline('http://' + config.serverHost + ':' + config.serverPort));
			console.log();
		}
	});

	printWebpackConfigFile(config.webpackConfigFile);
	verbose('Webpack static config:', compiler.compilers[0].options);
	verbose('Webpack client config:', compiler.compilers[1].options);

	// Show message when Webpack is recompiling the bundle
	compiler.plugin('invalid', function() {
		console.log('Compiling…');
	});

	// Custom error reporting
	compiler.plugin('done', function(multiStats) {
		multiStats.stats.forEach(stats => printCompilationDone(stats, true));
	});
}

function commandHelp() {
	console.log([
		chalk.underline('Usage'),
		'',
		'    ' + chalk.bold('styleguidist') + ' ' + chalk.cyan('<command>') + ' ' + chalk.yellow('[<options>]'),
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
	].join('\n'));
}
