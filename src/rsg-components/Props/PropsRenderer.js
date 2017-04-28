import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import Group from 'react-group';
import { unquote, getType, showSpaces } from './util';
import JsDocArguments from 'rsg-components/JsDoc/Arguments';
import JsDocDeprecated from 'rsg-components/JsDoc/Deprecated';
import JsDocLinks from 'rsg-components/JsDoc/Links';
import JsDocSince from 'rsg-components/JsDoc/Since';
import JsDocVersion from 'rsg-components/JsDoc/Version';

const styles = ({ space, color, fontFamily, fontSize }) => ({
	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},
	tableHead: {
		borderBottom: [[1, color.border, 'solid']],
	},
	tableBody: {
	},
	row: {
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
		color: color.base,
		width: '99%',
		paddingLeft: space[2],
	},
	required: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		color: color.light,
	},
	name: {
		fontSize: fontSize.small,
		color: color.name,
	},
	deprecatedName: {
		fontSize: 13,
		color: light,
		textDecoration: 'line-through',
	},
	type: {
		fontSize: fontSize.small,
		color: color.type,
	},
	function: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		color: color.light,
		borderBottom: [[1, 'dotted', color.lightest]],
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
		if (prop.tags && 'deprecated' in prop.tags) {
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
				<JsDocDeprecated tags={prop.tags} />
				<JsDocVersion tags={prop.tags} />
				<JsDocSince tags={prop.tags} />
				<Group separator={<br />}>
					{description && <Markdown text={description} inline />}
					{extra}
				</Group>
				<JsDocLinks tags={prop.tags} />
				<JsDocArguments tags={prop.tags} />
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
