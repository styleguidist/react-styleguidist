import React from 'react';

import { Table, TableHead, TableBody, TableRow, TableCell } from './index';

describe('Markdown Table', () => {
	it('should render a table', () => {
		const actual = render(
			<Table>
				<TableHead>
					<TableRow>
						<TableCell header>1st header</TableCell>
						<TableCell header>2nd header</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>1st cell</TableCell>
						<TableCell>2nd cell</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);

		expect(actual).toMatchSnapshot();
	});
});
