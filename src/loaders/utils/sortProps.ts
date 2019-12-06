import sortBy from 'lodash/sortBy';
import { PropDescriptor } from 'react-docgen';

/**
 * Sorts an array of properties by their 'required' property first and 'name'
 * property second.
 *
 * @param {array} props
 * @return {array} Sorted properties
 */
function sortProps(props: PropDescriptor[]) {
	const requiredPropNames = sortBy(props.filter(prop => prop.required), 'name');
	const optionalPropNames = sortBy(props.filter(prop => !prop.required), 'name');
	const sortedProps = requiredPropNames.concat(optionalPropNames);
	return sortedProps;
}

export default sortProps;
