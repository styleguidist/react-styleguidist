import React from 'react';

import { Table, TableHead, TableCell } from './index';

describe('Markdown Table', () => {
	it('should render a table', () => {
		const actual = render(
			<Table>
				<TableHead>
					<tr>
						<TableCell header>1st header</TableCell>
						<TableCell header>2nd header</TableCell>
					</tr>
				</TableHead>
				<tbody>
					<tr>
						<TableCell>1st cell</TableCell>
						<TableCell>2nd cell</TableCell>
					</tr>
				</tbody>
			</Table>
		);

		expect(actual).toMatchSnapshot();
	});
});
