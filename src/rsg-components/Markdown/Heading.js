import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

import HeadingRenderer from 'rsg-components/Heading/HeadingRenderer';

function MarkdownHeading({ classes, depth, children }) {
	return (
		<div className={classes.spacing}>
			<HeadingRenderer depth={depth}>{children}</HeadingRenderer>
		</div>
	);
}

const styles = ({ space }) => ({
	spacing: {
		marginTop: 0,
		marginBottom: space[2],
	},
});

MarkdownHeading.propTypes = {
	classes: PropTypes.object.isRequired,
	depth: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(MarkdownHeading);
