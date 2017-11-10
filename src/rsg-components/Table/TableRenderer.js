import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ space, color, fontFamily, fontSize }) => ({
	table: {
		width: '100%',
		borderCollapse: 'collapse',
		marginBottom: space[4],
	},
	tableHead: {
		borderBottom: [[1, color.border, 'solid']],
	},
	cellHeading: {
		color: color.base,
		paddingRight: space[2],
		paddingBottom: space[1],
		textAlign: 'left',
		fontFamily: fontFamily.base,
		fontWeight: 'bold',
		fontSize: fontSize.small,
		whiteSpace: 'nowrap',
	},
	cell: {
		color: color.base,
		paddingRight: space[2],
		paddingTop: space[1],
		paddingBottom: space[1],
		verticalAlign: 'top',
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		'&:last-child': {
			isolate: false,
			width: '99%',
			paddingRight: 0,
		},
		'& p:last-child': {
			isolate: false,
			marginBottom: 0,
		},
	},
});

export function TableRenderer({ classes, columns, rows, getRowKey }) {
	return (
		<table className={classes.table}>
			<thead className={classes.tableHead}>
				<tr>
					{columns.map(({ caption }) => (
						<th key={caption} className={classes.cellHeading}>
							{caption}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map(row => (
					<tr key={getRowKey(row)}>
						{columns.map(({ render }, index) => (
							<td key={index} className={classes.cell}>
								{render(row)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

TableRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			caption: PropTypes.string.isRequired,
			render: PropTypes.func.isRequired,
		})
	).isRequired,
	rows: PropTypes.arrayOf(PropTypes.object).isRequired,
	getRowKey: PropTypes.func.isRequired,
};

export default Styled(styles)(TableRenderer);
