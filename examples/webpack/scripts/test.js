process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

const jest = require('jest');
const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

// A temporary hack to clear terminal correctly.
// You can remove this after updating to Jest 18 when it's out.
// https://github.com/facebook/jest/pull/2230
var realWrite = process.stdout.write;
var CLEAR = process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H';
process.stdout.write = function(chunk, encoding, callback) {
  if (chunk === '\x1B[2J\x1B[H') {
    chunk = CLEAR;
  }
  return realWrite.call(this, chunk, encoding, callback);
};


jest.run(argv);
