import React from 'react';
import PropTypes from 'prop-types';
import Group from 'react-group';
import objectToString from 'javascript-stringify';
import Arguments from 'rsg-components/Arguments';
import Argument from 'rsg-components/Argument';
import Code from 'rsg-components/Code';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Text from 'rsg-components/Text';
import Para from 'rsg-components/Para';
import Table from 'rsg-components/Table';
import { unquote, getType, showSpaces } from './util';

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

function renderFlowType(type) {
	if (!type) {
		return 'unknown';
	}

	const { name, raw, value } = type;

	switch (name) {
		case 'literal':
			return value;
		case 'signature':
			return renderComplexType(type.type, raw);
		case 'union':
		case 'tuple':
			return renderComplexType(name, raw);
		default:
			return raw || name;
	}
}

function renderComplexType(name, title) {
	return (
		<Text size="small" underlined title={title}>
			<Type>{name}</Type>
		</Text>
	);
}

function renderEnum(prop) {
	if (!Array.isArray(getType(prop).value)) {
		return <span>{getType(prop).value}</span>;
	}

	const values = getType(prop).value.map(({ value }) => (
		<Code key={value}>{showSpaces(unquote(value))}</Code>
	));
	return (
		<span>
			One of:{' '}
			<Group separator=", " inline>
				{values}
			</Group>
		</span>
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
				<Name>{name}</Name>
				{': '}
				<Type>{renderType(prop)}</Type>
				{defaultValue && ' — '}
				{defaultValue}
				{description && ' — '}
				{description && <Markdown text={description} inline />}
			</div>
		);
	}
	return rows;
}

const defaultValueBlacklist = ['null', 'undefined'];

function renderDefault(prop) {
	// Workaround for issue https://github.com/reactjs/react-docgen/issues/221
	// If prop has defaultValue it can not be required
	if (prop.defaultValue) {
		if (prop.type || prop.flowType) {
			const propName = prop.type ? prop.type.name : prop.flowType.type;

			if (defaultValueBlacklist.indexOf(prop.defaultValue.value) > -1) {
				return <Code>{showSpaces(unquote(prop.defaultValue.value))}</Code>;
			} else if (propName === 'func' || propName === 'function') {
				return (
					<Text
						size="small"
						color="light"
						underlined
						title={showSpaces(unquote(prop.defaultValue.value))}
					>
						Function
					</Text>
				);
			} else if (propName === 'shape' || propName === 'object') {
				try {
					// We eval source code to be able to format the defaultProp here. This
					// can be considered safe, as it is the source code that is evaled,
					// which is from a known source and safe by default
					// eslint-disable-next-line no-eval
					const object = eval(`(${prop.defaultValue.value})`);
					return (
						<Text size="small" color="light" underlined title={objectToString(object, null, 2)}>
							Shape
						</Text>
					);
				} catch (e) {
					// eval will throw if it contains a reference to a property not in the
					// local scope. To avoid any breakage we fall back to rendering the
					// prop without any formatting
					return (
						<Text size="small" color="light" underlined title={prop.defaultValue.value}>
							Shape
						</Text>
					);
				}
			}
		}

		return <Code>{showSpaces(unquote(prop.defaultValue.value))}</Code>;
	} else if (prop.required) {
		return (
			<Text size="small" color="light">
				Required
			</Text>
		);
	}
	return '';
}

function renderDescription(prop) {
	const { description, tags = {} } = prop;
	const extra = renderExtra(prop);
	const args = [...(tags.arg || []), ...(tags.argument || []), ...(tags.param || [])];
	const returnDocumentation = (tags.return && tags.return[0]) || (tags.returns && tags.returns[0]);

	return (
		<div>
			{description && <Markdown text={description} />}
			{extra && <Para>{extra}</Para>}
			<JsDoc {...tags} />
			{args.length > 0 && <Arguments args={args} heading />}
			{returnDocumentation && <Argument {...returnDocumentation} returns />}
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
	const type = getType(prop);
	if (!Array.isArray(type.value)) {
		if (type.raw) {
			return <span>{type.raw}</span>;
		}
		return <span>{type.value}</span>;
	}

	const values = type.value.map((value, index) => (
		<Type key={`${value.name}-${index}`}>{renderType(value)}</Type>
	));
	return (
		<span>
			One of type:{' '}
			<Group separator=", " inline>
				{values}
			</Group>
		</span>
	);
}

function renderName(prop) {
	const { name, tags = {} } = prop;
	return <Name deprecated={!!tags.deprecated}>{name}</Name>;
}

function renderTypeColumn(prop) {
	if (prop.flowType) {
		return <Type>{renderFlowType(getType(prop))}</Type>;
	}
	return <Type>{renderType(getType(prop))}</Type>;
}

export function getRowKey(row) {
	return row.name;
}

export const columns = [
	{
		caption: 'Prop name',
		render: renderName,
	},
	{
		caption: 'Type',
		render: renderTypeColumn,
	},
	{
		caption: 'Default',
		render: renderDefault,
	},
	{
		caption: 'Description',
		render: renderDescription,
	},
];

export default function PropsRenderer({ props }) {
	return <Table columns={columns} rows={props} getRowKey={getRowKey} />;
}

PropsRenderer.propTypes = {
	props: PropTypes.array.isRequired,
};
