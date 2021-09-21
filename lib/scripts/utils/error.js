"use strict";

exports.__esModule = true;
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StyleguidistError extends Error {
  constructor(message, extra) {
    super(message);

    _defineProperty(this, "extra", void 0);

    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    });
    Object.defineProperty(this, 'extra', {
      value: extra
    });
  }

}

var _default = StyleguidistError;
exports.default = _default;