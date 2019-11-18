import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled, { JssInjectedProps, Theme } from 'rsg-components/Styled';

const styles = ({ space }: Theme) => ({
	root: {
		marginBottom: space[4],
	},
});

interface MessageProps extends JssInjectedProps {
	children: React.ReactNode;
}

export const MessageRenderer: React.FunctionComponent<MessageProps> = ({ classes, children }) => {
	return (
		<div className={classes.root}>
			<Markdown
				text={Array.isArray(children) ? children.join('\n') : children ? children.toString() : ''}
			/>
		</div>
	);
};

MessageRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled<MessageProps>(styles)(MessageRenderer);
