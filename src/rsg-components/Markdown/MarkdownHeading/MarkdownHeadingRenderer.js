import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';

const styles = ({ space }) => ({
	spacing: {
		marginBottom: space[2],
	},
});

function MarkdownHeadingRenderer({ classes, level, children }) {
	return (
		<div className={classes.spacing}>
			<Heading level={level}>{children}</Heading>
		</div>
	);
}

MarkdownHeadingRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(MarkdownHeadingRenderer);
