"use strict";

exports.__esModule = true;

var _typings = require("../typings");

Object.keys(_typings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _typings[key];
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('./index.esm').default;