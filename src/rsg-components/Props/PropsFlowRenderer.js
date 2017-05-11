/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes } from 'react';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import Group from 'react-group';
import { unquote, getType, showSpaces } from './util';

import s from './Props.css';

function renderDefault(prop) {
	if (prop.defaultValue) {
		return (
			<Code plain>
				{showSpaces(unquote(prop.defaultValue.value))}
			</Code>
 	);
	}
	else if (prop.required) {
		return (
			<span className={s.required}>Required</span>
 	);
	}
	return '';
}

function renderType(type) {
	if (!type) {
		return 'unknown';
	}

	const { name, raw, elements } = type;
	const signatureType = type.type;

	switch (name) {
		case 'Array':
			return `${raw.match(/<(.*)>/)[1]}[]`;
		case 'union': {
			const literals = elements.filter((value) => value.name === 'literal');
			if (literals.length === elements.length) {
				return 'enum';
			}
			return name;
		}
		case 'signature':
			return signatureType;
		default:
			return name;
	}
}

function renderEnum(elements) {
	const values = elements.map(({ value }) => (
		<Code key={value}>{showSpaces(unquote(value))}</Code>
  ));
	return (
		<span><span className={s.name}>One of:</span> <Group separator=", " inline>{values}</Group></span>
 );
}

function renderUnion(elements) {
	const values = elements.map((value) => (
		<Code key={value.name} className={s.type}>{renderType(value)}</Code>
  ));
	return (
		<span><span className={s.name}>One of type:</span> <Group separator=", " inline>{values}</Group></span>
 );
}

function renderShape(signature) {
	return signature.properties.map(({ key, value }) => {
		const realKey = key.name || key;
		return (
			<div key={realKey}>
				<Code className={s.name}>{realKey}</Code>{': '}
				<Code className={s.type}>{renderType(value)}</Code>
			</div>
 	);
	});
}

function renderFunc(signature) {
	const values = signature.arguments.map(({ name, type }) => (
		<div key={name}>
			<Code className={s.name}>{name}</Code>{': '}
			<Code className={s.type}>{renderType(type)}</Code>
		</div>
  ));
	return (
		<span>
      Arguments:<br />
			{values}
      Return:<br />
			<Code className={s.name}>{signature.return.name}</Code>
		</span>
 );
}

function renderExtra(prop) {
	const type = getType(prop);

	if (!type) {
		return null;
	}
	const { elements, signature } = type;

	switch (type.name) {
		case 'union': {
			const literals = elements.filter((value) => value.name === 'literal');
			if (literals.length === elements.length) {
				return renderEnum(elements);
			}
			return renderUnion(elements);
		}
		case 'signature': {
			if (type.type === 'function') {
				return renderFunc(signature);
			}
			if (type.type === 'object') {
				return renderShape(signature);
			}
			return null;
		}
		case 'Array': {
			if (elements[0].type === 'object') {
				return renderShape(elements[0].signature);
			}
			return null;
		}
		default:
			return null;
	}
}

function renderDescription(prop) {
	const { description } = prop;
	const extra = renderExtra(prop);
	return (
		<Group>
			{description && <Markdown text={description} inline />}
			<br />
			{extra}
		</Group>
 );
}

function renderRows(props) {
	const rows = [];
	for (const name in props) {
		const prop = props[name];
		rows.push(
			<tr key={name}>
				<td className={s.cell}><Code className={s.name}>{name}</Code></td>
				<td className={s.cell}><Code className={s.type}>{renderType(getType(prop))}</Code></td>
				<td className={s.cell}>{renderDefault(prop)}</td>
				<td className={`${s.cell} ${s.cellDesc}`}>{renderDescription(prop)}</td>
			</tr>
    );
	}
	return rows;
}

export default function PropsRenderer({ props }) {
	return (
		<div className={s.tableWrapper}>
			<table className={s.table}>
				<thead className={s.tableHead}>
					<tr>
						<th className={s.cellHeading}>Name</th>
						<th className={s.cellHeading}>Type</th>
						<th className={`${s.cellHeading} ${s.cellHeading_wide}`}>Default</th>
						<th className={`${s.cellHeading} ${s.cellDesc}`}>Description</th>
					</tr>
				</thead>
				<tbody className={s.tableBody}>
					{renderRows(props)}
				</tbody>
			</table>
		</div>
 );
}

PropsRenderer.propTypes = {
	props: PropTypes.object.isRequired,
};
