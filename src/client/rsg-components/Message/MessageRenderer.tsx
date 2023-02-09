import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ space }: Rsg.Theme) => ({
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
				text={
					Array.isArray(children)
						? children.join('\n')
						: typeof children === 'string'
						? children
						: ''
				}
			/>
		</div>
	);
};

MessageRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any.isRequired,
};

export default Styled<MessageProps>(styles)(MessageRenderer);
