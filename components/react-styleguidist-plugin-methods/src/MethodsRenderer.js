import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-styleguidist-plugin-markdown'
import Argument from 'react-styleguidist-plugin-argument'
import Arguments from 'react-styleguidist-plugin-arguments'
import Name from 'react-styleguidist-plugin-name'
import JsDoc from 'react-styleguidist-plugin-jsdoc'
import Table from 'react-styleguidist-plugin-table'

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
