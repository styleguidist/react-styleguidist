import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import Group from 'react-group';
import cx from 'classnames';

const styles = ({ base, font, border, light, name, type, spacing, fonts }) => ({
	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},
	tableHead: {
		borderBottom: [[1, border, 'solid']],
	},
	tableBody: {
	},
	row: {
	},
	cell: {
		color: base,
		paddingRight: spacing.space16,
		paddingTop: spacing.space8,
		verticalAlign: 'top',
		fontFamily: font,
		fontSize: fonts.size12,
	},
	cellHeading: {
		color: base,
		paddingRight: spacing.space16,
		paddingBottom: spacing.space8,
		textAlign: 'left',
		fontFamily: font,
		fontWeight: 'bold',
		fontSize: fonts.size12,
	},
	cellDesc: {
		width: '70%',
		paddingLeft: spacing.space16,
	},
	required: {
		fontFamily: font,
		fontSize: fonts.size12,
		color: light,
	},
	name: {
		fontSize: fonts.size12,
		color: name,
	},
	type: {
		fontSize: fonts.size12,
		color: type,
	},
});

export function MethodsRenderer({ classes, methods }) {
	function renderRows(methods) {
		const rows = [];
		methods.map((method) => {
			rows.push(
				<tr key={method.name} className={classes.row}>
					<td className={classes.cell}><Code className={classes.name}>{method.name}()</Code></td>
					<td className={classes.cell}>{renderParameters(method)}</td>
					<td className={cx(classes.cell, classes.cellDesc)}>
						{renderDescription(method)}
						{renderReturns(method)}
					</td>
				</tr>
			);
		});
		return rows;
	}

	function renderParameters(prop) {
		const { params } = prop;
		const rows = [];
		params.map((param) => {
			const { description, name, type } = param;
			rows.push(
				<div key={name} className={classes.methodParam}>
					<Code className={classes.name}>{name}</Code>
					{type && ': '}
					{type && <Code className={classes.type}>{type.name}</Code>}
					{description && ' — '}
					{description && <Markdown text={description} inline />}
				</div>
			);
		});
		return rows;
	}

	function renderReturns(prop) {
		const { returns } = prop;
		return returns ? (
			<span>
				Returns{' '}
				<Code className={classes.type}>{returns.type.name}</Code>
				{returns.description && ' — '}
				{returns.description && <Markdown text={returns.description} inline />}
			</span>
		) : false;
	}

	function renderDescription(prop) {
		const { description } = prop;
		return (
			<Group>
				{description && <Markdown text={description} inline />}
			</Group>
		);
	}

	return (
		<table className={classes.table}>
			<thead className={classes.tableHead}>
				<tr className={classes.row}>
					<th className={classes.cellHeading}>Name</th>
					<th className={classes.cellHeading}>Parameters</th>
					<th className={cx(classes.cellHeading, classes.cellDesc)}>Description</th>
				</tr>
			</thead>
			<tbody className={classes.tableBody}>
				{renderRows(methods)}
			</tbody>
		</table>
	);
}

MethodsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	methods: PropTypes.array.isRequired,
};

export default Styled(styles)(MethodsRenderer);
