import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Group from 'react-group';

export const styles = ({ space }) => ({
	block: {
		marginBottom: space[2],
	},
});

export function ArgumentRenderer({ classes, name, type, description, returns, block, ...props }) {
	return (
		<Group className={block && classes.block} {...props}>
			{returns && 'Returns'}
			{name && (
				<span>
					<Name>{name}</Name>
					{type && ':'}
				</span>
			)}
			{type && <Type>{type.name}</Type>}
			{type && description && ` — `}
			{description && <Markdown text={`${description}`} inline />}
		</Group>
	);
}

ArgumentRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	type: PropTypes.object,
	description: PropTypes.string,
	returns: PropTypes.bool,
	block: PropTypes.bool,
};

export default Styled(styles)(ArgumentRenderer);
