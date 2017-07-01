import React from 'react';
import { TableRenderer, styles } from './TableRenderer';

const columns = [
	{
		caption: 'Name',
		// eslint-disable-next-line react/prop-types
		render: ({ name }) => <span>name: {name}</span>,
	},
	{
		caption: 'Type',
		// eslint-disable-next-line react/prop-types
		render: ({ type }) => <span>type: {type}</span>,
	},
];
const rows = [
	{ name: 'Quattro formaggi', type: 'pizza' },
	{ name: 'Tiramisu', type: 'desert' },
	{ name: 'Unicorn', type: 'animal' },
];
const props = {
	classes: classes(styles),
	getRowKey: row => row.name,
};

it('should render a table', () => {
	const actual = shallow(<TableRenderer {...props} columns={columns} rows={rows} />);

	expect(actual).toMatchSnapshot();
});
