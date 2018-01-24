'use strict';

function sortProps(props) {
	const propNames = Object.keys(props);
	const requiredPropNames = propNames.filter(propName => props[propName].required).sort();
	const optionalPropNames = propNames.filter(propName => !props[propName].required).sort();
	const sortedProps = requiredPropNames.concat(optionalPropNames).reduce((acc, name) => {
		props[name].name = name;
		acc.push(props[name]);
		return acc;
	}, []);
	return sortedProps;
}

module.exports = sortProps;
