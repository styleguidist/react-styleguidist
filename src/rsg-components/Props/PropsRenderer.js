import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import Group from 'react-group';
import { unquote, getType, showSpaces } from './util';
import { JsDocDeprecated, JsDocArguments, JsDocLinks, JsDocVersion, JsDocSince } from '../JsDoc';

const styles = ({ font, border, light, lightest, name, type }) => ({
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
		width: '99%',
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
	function: {
		fontFamily: font,
		fontSize: 13,
		color: light,
		borderBottom: `1px dotted ${lightest}`,
	},
});

function renderType(type) {
	if (!type) {
		return 'unknown';
	}

	const { name } = type;

	switch (name) {
		case 'arrayOf':
			return `${type.value.name}[]`;
		case 'objectOf':
			return `{${renderType(type.value)}}`;
		case 'instanceOf':
			return type.value;
		default:
			return name;
	}
}

function renderEnum(prop) {
	if (!Array.isArray(getType(prop).value)) {
		return <span>{getType(prop).value}</span>;
	}

	const values = getType(prop).value.map(({ value }) => (
		<Code key={value}>{showSpaces(unquote(value))}</Code>
	));
	return (
		<span>One of: <Group separator=", " inline>{values}</Group></span>
	);
}

export function PropsRenderer({ classes, props }) {
	function renderRows(props) {
		const rows = [];
		for (const name in props) {
			const prop = props[name];
			rows.push(
				<tr key={name} className={classes.row}>
					<td className={classes.cell}>{renderPropName(name, prop)}</td>
					<td className={classes.cell}><Code className={classes.type}>{renderType(getType(prop))}</Code></td>
					<td className={classes.cell}>{renderDefault(prop)}</td>
					<td className={classes.cell + ' ' + classes.cellDesc}>{renderDescription(prop)}</td>
				</tr>
			);
		}
		return rows;
	}

	function renderPropName(name, prop) {
		if ('deprecated' in prop.tags) {
			return (<Code className={classes.deprecatedName}>{name}</Code>);
		}

		return (<Code className={classes.name}>{name}</Code>);
	}

	function renderDefault(prop) {
		if (prop.required) {
			return (
				<span className={classes.required}>Required</span>
			);
		}
		else if (prop.defaultValue) {
			if (prop.type && prop.type.name === 'func') {
				return (
					<span className={classes.function} title={showSpaces(unquote(prop.defaultValue.value))}>Function</span>
				);
			}

			return (
				<Code>{showSpaces(unquote(prop.defaultValue.value))}</Code>
			);
		}
		return '';
	}

	function renderDescription(prop) {
		const { description } = prop;
		const extra = renderExtra(prop);
		return (
			<div>
				{prop.tags.deprecated && <JsDocDeprecated tags={prop.tags} />}
				{prop.tags.version && <JsDocVersion tags={prop.tags} />}
				{prop.tags.since && <JsDocSince tags={prop.tags} />}
				<Group separator={<br />}>
					{description && <Markdown text={description} inline />}
					{extra}
				</Group>
				{(prop.tags.link || prop.tags.see) && <JsDocLinks tags={prop.tags} />}
				{(prop.tags.arg || prop.tags.argument || prop.tags.param) && <JsDocArguments tags={prop.tags} />}
			</div>
		);
	}

	function renderExtra(prop) {
		const type = getType(prop);

		if (!type) {
			return null;
		}
		switch (type.name) {
			case 'enum':
				return renderEnum(prop);
			case 'union':
				return renderUnion(prop);
			case 'shape':
				return renderShape(prop.type.value);
			case 'arrayOf':
				if (type.value.name === 'shape') {
					return renderShape(prop.type.value.value);
				}
				return null;
			case 'objectOf':
				if (type.value.name === 'shape') {
					return renderShape(prop.type.value.value);
				}
				return null;
			default:
				return null;
		}
	}

	function renderUnion(prop) {
		if (!Array.isArray(getType(prop).value)) {
			return <span>{getType(prop).value}</span>;
		}

		const values = getType(prop).value.map(value => (
			<Code key={value.name} className={classes.type}>{renderType(value)}</Code>
		));
		return (
			<span>One of type: <Group separator=", " inline>{values}</Group></span>
		);
	}

	function renderShape(props) {
		const rows = [];
		for (const name in props) {
			const prop = props[name];
			const defaultValue = renderDefault(prop);
			const description = prop.description;
			rows.push(
				<div key={name}>
					<Code className={classes.name}>{name}</Code>{': '}
					<Code className={classes.type}>{renderType(prop)}</Code>
					{defaultValue && ' — '}{defaultValue}
					{description && ' — '}
					{description && <Markdown text={description} inline />}
				</div>
			);
		}
		return rows;
	}

	return (
		<table className={classes.table}>
			<thead className={classes.tableHead}>
				<tr className={classes.row}>
					<th className={classes.cellHeading}>Name</th>
					<th className={classes.cellHeading}>Type</th>
					<th className={classes.cellHeading}>Default</th>
					<th className={classes.cellHeading + ' ' + classes.cellDesc}>Description</th>
				</tr>
			</thead>
			<tbody className={classes.tableBody}>
				{renderRows(props)}
			</tbody>
		</table>
	);
}

PropsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	props: PropTypes.object.isRequired,
};

export default Styled(styles)(PropsRenderer);
