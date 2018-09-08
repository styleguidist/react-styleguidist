import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";

// Inspired by https://github.com/camwest/react-slot-fill
import React from 'react';
import PropTypes from 'prop-types';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
export default function Slot(_ref, _ref2) {
  const name = _ref.name;

      
const active = _ref.active;

      
const onlyActive = _ref.onlyActive;

      
const className = _ref.className;

      
const _ref$props = _ref.props;

      
const props = _ref$props === void 0 ? {} : _ref$props;
  const slots = _ref2.slots;
  const fills = slots[name];

  if (!fills) {
    throw new Error("Slot \"".concat(name, "\" not found, available slots: ").concat(Object.keys(slots).join(', ')));
  }

  const rendered = fills.map(function (Fill, index) {
    // { id: 'pizza', render: ({ foo }) => <div>{foo}</div> }
    const _Fill = Fill;

        
const id = _Fill.id;

        
const render = _Fill.render;
    let fillProps = props;

    if (id && render) {
      // Render only specified fill
      if (onlyActive && id !== active) {
        return null;
      }

      const onClick = props.onClick;
      fillProps = _objectSpread({}, props, {
        name: id,
        // Set active prop to active fill
        active: active && id === active,
        // Pass fill ID to onClick event handler
        // eslint-disable-next-line react/prop-types
        onClick: onClick && function () {
          for (var _len = arguments.length, attrs = new Array(_len), _key = 0; _key < _len; _key++) {
            attrs[_key] = arguments[_key];
          }

          return onClick(...[id].concat(attrs));
        }
      });
      Fill = render;
    }

    return React.createElement(Fill, _extends({
      key: index
    }, fillProps));
  });
  const filtered = rendered.filter(Boolean);

  if (filtered.length === 0) {
    return null;
  }

  return React.createElement("div", {
    className
  }, filtered);
}
Slot.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.string,
  onlyActive: PropTypes.bool,
  props: PropTypes.object,
  className: PropTypes.string
};
Slot.contextTypes = {
  slots: PropTypes.object.isRequired
};