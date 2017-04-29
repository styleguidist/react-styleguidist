import React from 'react';
import PropTypes from 'prop-types';
import Group from 'react-group';
import Arguments from 'rsg-components/Arguments';
import Code from 'rsg-components/Code';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Styled from 'rsg-components/Styled';
import map from 'lodash/map';
import { unquote, getType, showSpaces } from './util';

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
		color: color.base,
		width: '99%',
		paddingLeft: space[2],
		paddingRight: 0,
	},
	required: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		color: color.light,
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
	heading: {
		marginBottom: 3,
		fontWeight: 'bold',
		fontSize: 13,
	},
	para: {
		marginBottom: 15,
		fontSize: 13,
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
	function renderRow(prop, name) {
		const deprecated = !!(prop.tags && prop.tags.deprecated);
		return (
			<tr key={name}>
				<td className={classes.cell}>
					<Name name={name} deprecated={deprecated} />
				</td>
				<td className={classes.cell}>
					<Code className={classes.type}>{renderType(getType(prop))}</Code>
				</td>
				<td className={classes.cell}>{renderDefault(prop)}</td>
				<td className={classes.cell + ' ' + classes.cellDesc}>{renderDescription(prop)}</td>
			</tr>
		);
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
		const { description, tags = {} } = prop;
		const extra = renderExtra(prop);
		const args = [...tags.arg || [], ...tags.argument || [], ...tags.param || []];
		return (
			<div>
				{description && <Markdown text={description} />}
				{extra && <div className={classes.para}>{extra}</div>}
				<JsDoc {...tags} />
				{args.length > 0 && (
					<div>
						<h4 className={classes.heading}>Arguments</h4>
						<Arguments args={args} />
					</div>
				)}
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
				<tr>
					<th className={classes.cellHeading}>Name</th>
					<th className={classes.cellHeading}>Type</th>
					<th className={classes.cellHeading}>Default</th>
					<th className={classes.cellHeading + ' ' + classes.cellDesc}>Description</th>
				</tr>
			</thead>
			<tbody>
				{map(props, renderRow)}
			</tbody>
		</table>
	);
}

PropsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	props: PropTypes.object.isRequired,
};

export default Styled(styles)(PropsRenderer);
