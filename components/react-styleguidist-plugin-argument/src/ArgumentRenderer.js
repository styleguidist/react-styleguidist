import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist-plugin-styled'
import Markdown from 'react-styleguidist-plugin-markdown'
import Name from 'react-styleguidist-plugin-name'
import Type from 'react-styleguidist-plugin-type'
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
