import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = ({ maxWidth }) => ({
	root: {
		maxWidth,
		margin: [[0, 'auto']],
	},
});

export function NotFoundRenderer({ classes }) {
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
}

NotFoundRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(NotFoundRenderer);
