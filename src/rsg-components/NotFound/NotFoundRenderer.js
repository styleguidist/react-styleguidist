import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = ({ maxWidth, space }) => ({
	root: {
		maxWidth,
		margin: [[0, 'auto']],
		padding: space[4],
	},
});

export function NotFoundRenderer({ classes }) {
	return (
		<div className={classes.root}>
			<Markdown
				text={`
# 404

## Sorry, this page isn't available

The link you followed may be broken, or the page may have been removed

`}
			/>
		</div>
	);
}

NotFoundRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(NotFoundRenderer);
