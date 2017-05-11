import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Argument from 'rsg-components/Argument';
import Arguments from 'rsg-components/Arguments';
import Name from 'rsg-components/Name';
import JsDoc from 'rsg-components/JsDoc';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

const styles = ({ space, color, fontFamily, fontSize }) => ({
	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},
	tableHead: {
		borderBottom: [[1, color.border, 'solid']],
	},
	cell: {
		color: color.base,
		paddingRight: space[2],
		paddingTop: space[1],
		verticalAlign: 'top',
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
	},
	cellHeading: {
		color: color.base,
		paddingRight: space[2],
		paddingBottom: space[1],
		textAlign: 'left',
		fontFamily: fontFamily.base,
		fontWeight: 'bold',
		fontSize: fontSize.small,
	},
	cellDesc: {
		width: '70%',
		paddingLeft: space[2],
		paddingRight: 0,
	},
	para: {
		marginBottom: space[2],
		fontSize: fontSize.small,
	},
});

export function MethodsRenderer({ classes, methods }) {
	function renderRow(method) {
		const { name, description, returns, params = [], tags = {} } = method;
		return (
			<tr key={name}>
				<td className={classes.cell}>
					<Name name={`${name}()`} deprecated={tags.deprecated} />
				</td>
				<td className={classes.cell}>
					<Arguments args={params} />
				</td>
				<td className={cx(classes.cell, classes.cellDesc)}>
					{description && <Markdown text={description} />}
					{returns && <Argument className={classes.para} returns {...returns} />}
					<JsDoc {...tags} />
				</td>
			</tr>
		);
	}

	return (
		<table className={classes.table}>
			<thead className={classes.tableHead}>
				<tr>
					<th className={classes.cellHeading}>Name</th>
					<th className={classes.cellHeading}>Parameters</th>
					<th className={cx(classes.cellHeading, classes.cellDesc)}>Description</th>
				</tr>
			</thead>
			<tbody>
				{methods.map(renderRow)}
			</tbody>
		</table>
	);
}

MethodsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	methods: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			returns: PropTypes.object,
			params: PropTypes.array,
			tags: PropTypes.object,
		})
	).isRequired,
};

export default Styled(styles)(MethodsRenderer);
