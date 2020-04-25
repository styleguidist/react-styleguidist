import React from 'react';
import PropTypes from 'prop-types';
import Arguments from 'rsg-components/Arguments';
import Argument from 'rsg-components/Argument';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Para from 'rsg-components/Para';
import Table from 'rsg-components/Table';
import renderTypeColumn from './renderType';
import renderExtra from './renderExtra';
import renderDefault from './renderDefault';
import { PropDescriptor } from './util';

function renderDescription(prop: PropDescriptor) {
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
			{returnDocumentation && <Argument {...{ ...returnDocumentation, name: '' }} returns />}
		</div>
	);
}

function renderName(prop: PropDescriptor) {
	const { name, tags = {} } = prop;
	return <Name deprecated={!!tags.deprecated}>{name}</Name>;
}

export function getRowKey(row: { name: string }) {
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

interface PropsProps {
	props: PropDescriptor[];
}

const PropsRenderer: React.FunctionComponent<PropsProps> = ({ props }) => {
	return <Table columns={columns} rows={props} getRowKey={getRowKey} />;
};

PropsRenderer.propTypes = {
	props: PropTypes.array.isRequired,
};

export default PropsRenderer;
