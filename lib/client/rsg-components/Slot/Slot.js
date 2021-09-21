import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Inspired by https://github.com/camwest/react-slot-fill
import React from 'react';
import PropTypes from 'prop-types';
import { useStyleGuideContext } from 'rsg-components/Context';
export default function Slot(_ref) {
  var name = _ref.name,
      active = _ref.active,
      onlyActive = _ref.onlyActive,
      className = _ref.className,
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? {} : _ref$props;

  var _useStyleGuideContext = useStyleGuideContext(),
      slots = _useStyleGuideContext.slots;

  var fills = slots[name];

  if (!fills) {
    throw new Error("Slot \"" + name + "\" not found, available slots: " + Object.keys(slots).join(', '));
  }

  var rendered = fills.map(function (Fill, index) {
    // { id: 'pizza', render: ({ foo }) => <div>{foo}</div> }
    var _ref2 = Fill,
        id = _ref2.id,
        render = _ref2.render;
    var fillProps = props;

    if (id && render) {
      // Render only specified fill
      if (onlyActive && id !== active) {
        return null;
      } // eslint-disable-next-line react/prop-types


      var onClick = props.onClick;
      fillProps = Object.assign({}, props, {
        name: id,
        // Set active prop to active fill
        active: active ? id === active : undefined,
        // Pass fill ID to onClick event handler
        onClick: onClick && function () {
          for (var _len = arguments.length, attrs = new Array(_len), _key = 0; _key < _len; _key++) {
            attrs[_key] = arguments[_key];
          }

          return onClick.apply(void 0, [id].concat(attrs));
        }
      });
      var Render = render;
      return /*#__PURE__*/React.createElement(Render, _extends({
        key: index
      }, fillProps));
    }

    var FillAsComponent = Fill;
    return /*#__PURE__*/React.createElement(FillAsComponent, _extends({
      key: index
    }, fillProps));
  });
  var filtered = rendered.filter(Boolean);

  if (filtered.length === 0) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, filtered);
}
Slot.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.string,
  onlyActive: PropTypes.bool,
  props: PropTypes.object,
  className: PropTypes.string
};