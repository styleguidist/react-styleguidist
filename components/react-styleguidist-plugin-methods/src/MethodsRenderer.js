import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Argument from 'rsg-components/Argument';
import Arguments from 'rsg-components/Arguments';
import Name from 'rsg-components/Name';
import JsDoc from 'rsg-components/JsDoc';
import Table from 'rsg-components/Table';

const getRowKey = row => row.name;

export const columns = [
	{
		caption: 'Method name',
		// eslint-disable-next-line react/prop-types
		render: ({ name, tags = {} }) => <Name deprecated={!!tags.deprecated}>{`${name}()`}</Name>,
	},
	{
		caption: 'Parameters',
		// eslint-disable-next-line react/prop-types
		render: ({ params = [] }) => <Arguments args={params} />,
	},
	{
		caption: 'Description',
		// eslint-disable-next-line react/prop-types
		render: ({ description, returns, tags = {} }) => (
			<div>
				{description && <Markdown text={description} />}
				{returns && <Argument block returns {...returns} />}
				<JsDoc {...tags} />
			</div>
		),
	},
];

export default function MethodsRenderer({ methods }) {
	return <Table columns={columns} rows={methods} getRowKey={getRowKey} />;
}

MethodsRenderer.propTypes = {
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
