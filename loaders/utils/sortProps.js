'use strict';

/**
 * Transforms the properties from an object to an array and sort them by the their 'required'
 * property and names.
 *
 * @param {object} props
 * @return {array} Sorted properties
 */
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
