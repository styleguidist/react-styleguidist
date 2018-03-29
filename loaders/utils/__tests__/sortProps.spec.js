import sortProps from '../sortProps';

function makeProp(name, required, defaultValue, type) {
	// Default values.
	required = required === undefined ? false : required;
	type = type === undefined ? { name: 'string' } : type;

	return {
		name,
		required,
		defaultValue,
		type,
	};
}

it('should sort required props', () => {
	const props = [makeProp('prop2', true), makeProp('prop1', true)];
	const result = sortProps(props);
	expect(result.map(prop => prop.name)).toEqual(['prop1', 'prop2']);
});

it('should sort optional props', () => {
	const props = [makeProp('prop2', false), makeProp('prop1', false)];
	const result = sortProps(props);
	expect(result.map(prop => prop.name)).toEqual(['prop1', 'prop2']);
});

it('should sort mixed props (required props should come first)', () => {
	const props = [
		makeProp('prop2', false),
		makeProp('prop1', true),
		makeProp('prop3', true),
		makeProp('prop4', false),
	];
	const result = sortProps(props);
	expect(result.map(prop => prop.name)).toEqual(['prop1', 'prop3', 'prop2', 'prop4']);
});
