import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Code from 'rsg-components/Code';
import Name from 'rsg-components/Name';
import Group from 'react-group';

export const styles = ({ color }) => ({
	type: {
		fontSize: 'inherit',
		color: color.type,
	},
});

export function ArgumentRenderer({ classes, name, type, description, returns, ...props }) {
	return (
		<Group {...props}>
			{returns && 'Returns'}
			{name &&
				<span>
					<Name name={name} />
					{type && ':'}
				</span>}
			{type && <Code className={classes.type}>{type.name}</Code>}
			{description && <Markdown text={`— ${description}`} inline />}
		</Group>
	);
}

ArgumentRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	type: PropTypes.object,
	description: PropTypes.string,
	returns: PropTypes.bool,
};

export default Styled(styles)(ArgumentRenderer);
