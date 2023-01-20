import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { TableRenderer, styles } from './TableRenderer';

const columns = [
	{
		caption: 'Name',
		// eslint-disable-next-line react/prop-types
		render: ({ name }: { name: string }) => <span>name: {name}</span>,
	},
	{
		caption: 'Type',
		// eslint-disable-next-line react/prop-types
		render: ({ type }: { type: string }) => <span>type: {type}</span>,
	},
];
const rows = [
	{ name: 'Quattro formaggi', type: 'pizza' },
	{ name: 'Tiramisu', type: 'desert' },
	{ name: 'Unicorn', type: 'animal' },
];
const props = {
	classes: classes(styles),
	getRowKey: (row: { name: string }) => row.name,
};

it('should render a table', () => {
	const renderer = createRenderer();
	renderer.render(<TableRenderer {...props} columns={columns} rows={rows} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
