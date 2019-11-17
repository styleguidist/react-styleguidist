import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled, { JssInjectedProps, Theme } from 'rsg-components/Styled';

const styles = ({ maxWidth }: Theme) => ({
	root: {
		maxWidth,
		margin: [[0, 'auto']],
	},
});

export const NotFoundRenderer: React.FunctionComponent<JssInjectedProps> = ({ classes }) => {
	return (
		<div className={classes.root}>
			<Markdown
				text={`
# Page not found
The link you followed may be broken, or the page may have been removed.
`}
			/>
		</div>
	);
};

NotFoundRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Styled(styles)(NotFoundRenderer);
