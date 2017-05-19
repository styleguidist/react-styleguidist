import Immutable from 'immutable';
import forEach from 'lodash/forEach';
import parseCode from '../utils/parseCode';

export function parseProps(props) {
  const codeParams = parseCode(props.code, props.componentName);
  const fields = {};
  forEach(props.props, (item, key) => {
    fields[key] = new Immutable.Map({
      name: key,
      type: item.type,
      defaultValue: item.defaultValue,
      value: codeParams[key],
      disabled: !codeParams[key],
    });
  });
  return fields;
}

export function parseDefault(defaultVal) {
  // eslint-disable-next-line no-new-func
  const func = new Function('', `return ${defaultVal.value};`);
  return func();
}

export function getTypeForLabel(type) {
  switch (type.name) {
    case 'bool':
    case 'node':
    case 'string': return type.name;
    case 'func': return 'callback';
    case 'number': return 'int';
    case 'enum': return 'oneOf';
    case 'shape': return 'shape';
    case 'arrayOf': return `${type.name}[${getTypeForLabel(type.value)}]`;
    default: return '';
  }
}

/**
 * Генерирует код из полей формы
 * @param  object field поля формы
 * @return string       props со значением
 */
export function generateProps(field) {
  const { type, name, disabled, value } = field;
  if (disabled) {
    return '';
  }

  let propCode = '';
  switch (type.name) {
    case 'string':
      propCode = `${name}="${value}"`;
      break;

    case 'number':
      propCode = `${name}={${parseFloat(value)}}`;
      break;

    case 'enum': {
      const rawValue = parseFloat(value);
      if (rawValue) {
        propCode = `${name}={${rawValue}}`;
      }
      propCode = `${name}="${value}"`;
      break;
    }

    case 'bool':
      propCode = `${name}={${value ? 'true' : 'false'}}`;
      break;

    case 'arrayOf': {
      switch (type.value.name) {
        case 'number':
          propCode = `${name}={[${value}]}`;
          break;

        case 'string': {
          const rawValue = value.replace(/([\wа-я]+)($|,){1}\s*/iug, "'$1'$2 ");
          propCode = `${name}={[${rawValue.trim()}]}`;
          break;
        }

        case 'shape':
          propCode = `${name}={${value}}`;
          break;

        default: break;
      }
      break;
    }
    default:
      propCode = `${name}={${value}}`;
  }
  return propCode;
}

/**
 * Получить отступ для props
 * @return string
 */
function getTabsForProps(code, componentName) {
  const regExp = new RegExp(`<${componentName}\n+([\\s]+)`, 'g');
  try {
    const tabs = regExp.exec(code)[1];
    return tabs;
  }
  catch (e) {
    return '\t';
  }
}

export function generateNewCode(code, componentName, props) {
  const tabs = getTabsForProps(code, componentName);
  const formattedProps = props.join(`\n${tabs}`);
  const regExp = new RegExp(`<${componentName}(.|\t|\n)+/>`, 'g');
  return code.replace(
    regExp,
    `<${componentName}\n${tabs}${formattedProps}\n${tabs.slice(0, -1)}/>`
  );
}
