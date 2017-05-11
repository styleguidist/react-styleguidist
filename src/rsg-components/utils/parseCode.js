const acorn = require('acorn-jsx');


/**
 * Найти узел компонента
 * @param  object node          объект с литералами
 * @param  string componentName имя искомого компонента
 * @param  strign code          сырая строк кода
 * @return object               найденая нода
 */
function findComponent(node, componentName, code) {
	const { openingElement, children, type } = node;
	if (type !== 'JSXElement') {
		return false;
	}

	if (openingElement.name.name === componentName) {
		return openingElement;
	}
	for (const child of children) {
		const findedComponent = findComponent(child, componentName);
		if (findedComponent) {
			return findedComponent;
		}
	}
	throw Error(`Parser can't find component in code ${code}`);
}

/**
 * Получить строку props с переданным параметром
 * @param  string name  имя props
 * @param  stringg code чистый код
 * @return string      props с переданным параметром
 */
function getPureProps(name, code) {
  // Отрезаем все что до пропса
	let regexp = new RegExp(`${name}=(\\{)`, 'gui');
	let match = regexp.exec(code);
	const cutStart = code.slice(match.index);

  // Отрезаем все что после последней }
	regexp = /(\}\n)/;
	match = regexp.exec(cutStart);
	const pureProp = cutStart.slice(0, match.index + 1);
	return pureProp;
}

/**
 * Получение чистого кода из props
 * @param  string name  имя props
 * @param  stringg code чистый код
 * @return string      чистый код
 */
function getPureCode(name, code) {
	const pureProps = getPureProps(name, code);
	const regexp = new RegExp(`${name}=\\{((.*\\n?\\s*)*)\\}`, 'gui');
	try {
		return regexp.exec(pureProps)[1];
	}
	catch (e) {
		throw new Error(e);
	}
}

/**
 * Распарсить код дабы получить значения props
 * @param  object conponentNode узел компонента
 * @param  string code          чистый код
 * @return array               массив найденных props
 */
function parseProps(conponentNode, code) {
	const props = {};
	for (const prop of conponentNode.attributes) {
		switch (prop.value.type) {
      // Простые пропсы
			case 'Literal': {
				props[prop.name.name] = prop.value.value;
				break;
			}
      // JS выражения
			case 'JSXExpressionContainer': {
				const { expression } = prop.value;
        // Простой литерал
				if (expression.type === 'Literal') {
					props[prop.name.name] = expression.value;
					break;
				}
        // Литерал массива
				if (expression.type === 'ArrayExpression') {
					const propArray = [];
					for (const node of expression.elements) {
            // Простой литерал
						if (node.type === 'Literal') {
							propArray.push(node.value);
						}
					}
					if (propArray.length !== 0) {
						props[prop.name.name] = propArray.join(', ');
						break;
					}
				}
        // В любых дргуих случаях получаем просто строку из кода
				props[prop.name.name] = getPureCode(prop.name.name, code);
				break;
			}
			default: {
				console.log(prop);
				break;
			}
		}
	}
	return props;
}

export default function(code, componentName) {
	const parseCode = acorn.parse(code, {
		plugins: { jsx: true },
	});
	const ellement = parseCode.body.find((node) => node.type === 'ExpressionStatement');
	const componentNode = findComponent(ellement.expression, componentName, code);
	const props = parseProps(componentNode, code);
	return props;
}
