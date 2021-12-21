import { PropDescriptor } from 'react-docgen';
/**
 * Sorts an array of properties by their 'required' property first and 'name'
 * property second.
 *
 * @param {array} props
 * @return {array} Sorted properties
 */
declare function sortProps(props: PropDescriptor[]): PropDescriptor[];
export default sortProps;
