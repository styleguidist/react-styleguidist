import React, { PropTypes } from 'react';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import Group from 'react-group';
import cx from 'classnames';

import s from './Methods.css';

function renderRows(methods) {
	const rows = [];
	methods.map((method) => {
		rows.push(
			<tr key={method.name}>
				<td className={s.cell}><Code className={s.name}>{method.name}()</Code></td>
				<td className={s.cell}>{renderParameters(method)}</td>
				<td className={cx(s.cell, s.cellDesc)}>
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
			<div key={name} className={s.methodParam}>
				<Code className={s.name}>{name}</Code>
				{type && ': '}
				{type && <Code className={s.type}>{type.name}</Code>}
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
			<Code className={s.type}>{returns.type.name}</Code>
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

export default function MethodsRenderer({ methods }) {
	return (
		<table className={s.table}>
			<thead className={s.tableHead}>
				<tr>
					<th className={s.cellHeading}>Name</th>
					<th className={s.cellHeading}>Parameters</th>
					<th className={cx(s.cellHeading, s.cellDesc)}>Description</th>
				</tr>
			</thead>
			<tbody className={s.tableBody}>
				{renderRows(methods)}
			</tbody>
		</table>
	);
}

MethodsRenderer.propTypes = {
	methods: PropTypes.array.isRequired,
};
