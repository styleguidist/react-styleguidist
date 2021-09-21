#!/usr/bin/env node

/* eslint-disable no-console */
"use strict";

const mri = require('mri');

const kleur = require('kleur');

const ora = require('ora');

const stringify = require('q-i').stringify;

const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const webpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils');

const openBrowser = require('react-dev-utils/openBrowser');

const logger = require('glogg')('rsg');

const getConfig = require('../scripts/config').default;

const setupLogger = require('../scripts/logger').default;

const consts = require('../scripts/consts');

const StyleguidistError = require('../scripts/utils/error').default;

const argv = mri(process.argv.slice(2));
const command = argv._[0]; // Do not show nasty stack traces for Styleguidist errors

process.on('uncaughtException', err => {
  if (err.code === 'EADDRINUSE') {
    printErrorWithLink(`Another server is running at port ${config.serverPort} already. Please stop it or change the default port to continue.`, 'You can change the port using the `serverPort` option in your style guide config:', consts.DOCS_CONFIG);
  } else if (err instanceof StyleguidistError) {
    console.error(kleur.bold().red(err.message));
    logger.debug(err.stack);
  } else {
    console.error(err.toString());
    console.error(err.stack);
  }

  process.exit(1);
}); // Make sure user has webpack installed

require('../scripts/utils/ensureWebpack'); // Set environment before loading style guide config because user’s webpack config may use it


const env = command === 'build' ? 'production' : 'development';
process.env.NODE_ENV = process.env.NODE_ENV || env; // Load style guide config

let config;

try {
  config = getConfig(argv.config, updateConfig);
} catch (err) {
  if (err instanceof StyleguidistError) {
    const link = consts.DOCS_CONFIG + (err.extra ? `#${err.extra.toLowerCase()}` : '');
    printErrorWithLink(err.message, `Learn how to configure your style guide:`, link);
    process.exit(1);
  } else {
    throw err;
  }
}

verboseLog('Styleguidist config:', config);

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
 * @param {object} prevConfig
 * @return {object}
 */


function updateConfig(prevConfig) {
  // Set verbose mode from config option or command line switch
  const verbose = prevConfig.verbose || argv.verbose; // Set serverPort from from command line or config option

  const serverPort = parseInt(argv.port) || prevConfig.serverPort; // Setup logger *before* config validation (because validations may use logger to print warnings)

  setupLogger(prevConfig.logger, verbose);
  return { ...prevConfig,
    verbose,
    serverPort
  };
}

function commandBuild() {
  console.log('Building style guide...');

  const build = require('../scripts/build').default;

  const compiler = build(config, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else if (config.printBuildInstructions) {
      config.printBuildInstructions(config);
    } else {
      printBuildInstructions(config);
    }
  });
  verboseLog('Webpack config:', compiler.options); // Custom error reporting

  compiler.hooks.done.tap('rsgCustomErrorBuild', function (stats) {
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const hasErrors = printAllErrorsAndWarnings(messages, stats.compilation);

    if (hasErrors) {
      process.exit(1);
    }
  });
}

function commandServer() {
  let spinner;

  const server = require('../scripts/server').default;

  const compiler = server(config, err => {
    if (err) {
      console.error(err);
    } else {
      const isHttps = compiler.options.devServer && compiler.options.devServer.https;
      const urls = webpackDevServerUtils.prepareUrls(isHttps ? 'https' : 'http', config.serverHost, config.serverPort);

      if (config.printServerInstructions) {
        config.printServerInstructions(config, {
          isHttps
        });
      } else {
        printServerInstructions(urls);
      }

      if (argv.open) {
        openBrowser(urls.localUrlForBrowser);
      }
    }
  }).compiler;
  verboseLog('Webpack config:', compiler.options); // Show message when webpack is recompiling the bundle

  compiler.hooks.invalid.tap('rsgInvalidServer', function () {
    console.log();
    spinner = ora('Compiling...').start();
  }); // Custom error reporting

  compiler.hooks.done.tap('rsgCustomErrorServer', function (stats) {
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
  console.log([kleur.underline('Usage'), '', '    ' + kleur.bold('styleguidist') + ' ' + kleur.cyan('<command>') + ' ' + kleur.yellow('[<options>]'), '', kleur.underline('Commands'), '', '    ' + kleur.cyan('build') + '           Build style guide', '    ' + kleur.cyan('server') + '          Run development server', '    ' + kleur.cyan('help') + '            Display React Styleguidist help', '', kleur.underline('Options'), '', '    ' + kleur.yellow('--config') + '        Config file path', '    ' + kleur.yellow('--port') + '          Port to run development server on', '    ' + kleur.yellow('--open') + '          Open Styleguidist in the default browser', '    ' + kleur.yellow('--verbose') + '       Print debug information'].join('\n'));
}
/**
 * @param {object} urls
 */


function printServerInstructions(urls) {
  console.log(`You can now view your style guide in the browser:`);
  console.log();
  console.log(`  ${kleur.bold('Local:')}            ${urls.localUrlForTerminal}`);

  if (urls.lanUrlForTerminal) {
    console.log(`  ${kleur.bold('On your network:')}  ${urls.lanUrlForTerminal}`);
  }

  console.log();
}
/**
 * @param {object} config
 */


function printBuildInstructions({
  styleguideDir
}) {
  console.log('Style guide published to:\n' + kleur.underline(styleguideDir));
}
/**
 * @param {string} message
 * @param {string} linkTitle
 * @param {string} linkUrl
 */


function printErrorWithLink(message, linkTitle, linkUrl) {
  console.error(`${kleur.bold().red(message)}\n\n${linkTitle}\n${kleur.underline(linkUrl)}\n`);
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
    console.log(kleur.inverse().bold().green(' DONE ') + ' ' + text);
  } else if (type === 'error') {
    console.error(kleur.inverse().bold().red(' FAIL ') + ' ' + kleur.red(text));
  } else {
    console.error(kleur.inverse().bold().yellow(' WARN ') + ' ' + kleur.yellow(text));
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
  } // Show warnings if no errors were found


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
  const styleguidistError = errors.find(message => message.includes('Module build failed: Error: Styleguidist:'));

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

  const noLoaderError = errors.find(message => message.includes('You may need an appropriate loader'));

  if (!noLoaderError) {
    return;
  }

  printErrorWithLink(noLoaderError, 'Learn how to add webpack loaders to your style guide:', consts.DOCS_WEBPACK);
  process.exit(1);
}
/**
 * @param {string} header
 * @param {object} object
 */


function verboseLog(header, object) {
  logger.debug(kleur.bold(header) + '\n\n' + stringify(object));
}