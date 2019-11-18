import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Argument from 'rsg-components/Argument';
import Arguments from 'rsg-components/Arguments';
import Name from 'rsg-components/Name';
import JsDoc from 'rsg-components/JsDoc';
import Table from 'rsg-components/Table';

const getRowKey = (row: MethodProp): string => row.name;

export const columns = [
	{
		caption: 'Method name',
		// eslint-disable-next-line react/prop-types
		render: ({ name, tags = {} }: MethodProp) => (
			<Name deprecated={!!tags.deprecated}>{`${name}()`}</Name>
		),
	},
	{
		caption: 'Parameters',
		// eslint-disable-next-line react/prop-types
		render: ({ params = [] }: MethodProp) => <Arguments args={params} />,
	},
	{
		caption: 'Description',
		// eslint-disable-next-line react/prop-types
		render: ({ description, returns, tags = {} }: MethodProp) => (
			<div>
				{description && <Markdown text={description} />}
				{returns && <Argument block returns {...returns} />}
				<JsDoc {...tags} />
			</div>
		),
	},
];

export interface MethodProp {
	name: string;
	description?: string;
	returns?: { name: string; [key: string]: any };
	params?: any[];
	modifiers?: string[];
	tags?: Record<string, any>;
}

const MethodsRenderer: React.FunctionComponent<{ methods: MethodProp[] }> = ({ methods }) => (
	<Table columns={columns} rows={methods} getRowKey={getRowKey} />
);

MethodsRenderer.propTypes = {
	methods: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			returns: PropTypes.object,
			params: PropTypes.array,
			tags: PropTypes.object,
		}).isRequired
	).isRequired,
};

export default MethodsRenderer;
