import "core-js/modules/es.object.assign";
import { create } from 'jss';
import global from 'jss-plugin-global';
import isolate from 'jss-plugin-isolate';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import compose from 'jss-plugin-compose';
import nonInheritedProps from './nonInheritedProps';

var createGenerateId = function createGenerateId() {
  var counter = 0;
  return function (rule) {
    return "rsg--" + rule.key + "-" + counter++;
  };
};

var jss = create({
  createGenerateId: createGenerateId,
  plugins: [global(), isolate({
    reset: Object.assign({}, nonInheritedProps, {
      // “Global” styles for all components
      boxSizing: 'border-box',
      // Allow inheritance because it may be set on body and should be available for user components
      color: 'inherit',
      font: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    })
  }), nested(), camelCase(), defaultUnit(), compose()]
});
export default jss;