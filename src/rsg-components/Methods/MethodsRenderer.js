import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import Group from 'react-group';
import cx from 'classnames';
import { JsDocDeprecated, JsDocLinks, JsDocVersion, JsDocSince } from '../JsDoc';


const styles = ({ font, border, light, name, type }) => ({
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
		paddingRight: 15,
		paddingTop: 6,
		verticalAlign: 'top',
		fontFamily: font,
		fontSize: 13,
	},
	cellHeading: {
		paddingRight: 15,
		paddingBottom: 6,
		textAlign: 'left',
		fontFamily: font,
		fontWeight: 'bold',
		fontSize: 13,
	},
	cellDesc: {
		width: '70%',
		paddingLeft: 15,
	},
	required: {
		fontFamily: font,
		fontSize: 13,
		color: light,
	},
	name: {
		fontSize: 13,
		color: name,
	},
	deprecatedName: {
		fontSize: 13,
		color: light,
		textDecoration: 'line-through',
	},
	type: {
		fontSize: 13,
		color: type,
	},
});

export function MethodsRenderer({ classes, methods }) {
	function renderRows(methods) {
		const rows = [];
		methods.map((method) => {
			rows.push(
				<tr key={method.name} className={classes.row}>
					<td className={classes.cell}>
						<Code className={classes.name}>{renderMethodName(method.name, method.tags)}</Code>
					</td>
					<td className={classes.cell}>{renderParameters(method)}</td>
					<td className={cx(classes.cell, classes.cellDesc)}>
						{method.tags.deprecated && <JsDocDeprecated tags={method.tags} />}
						{method.tags.version && <JsDocVersion tags={method.tags} />}
						{method.tags.since && <JsDocSince tags={method.tags} />}
						{renderDescription(method)}
						{renderReturns(method)}
						{(method.tags.see || method.tags.link) && <JsDocLinks tags={method.tags} />}
					</td>
				</tr>
			);
		});
		return rows;
	}

	function renderMethodName(name, tags) {
		if ('deprecated' in tags) {
			return (<Code className={classes.deprecatedName}>{name}()</Code>);
		}

		return (<Code className={classes.name}>{name}()</Code>);
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
				{returns.type && <Code className={classes.type}>{returns.type.name}</Code>}
				{returns.type && ' — '}
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
