import React from 'react';
import PropTypes from 'prop-types';
import Argument from 'rsg-components/Argument';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

export const styles = ({ space }) => ({
	root: {
		marginBottom: space[2],
		fontSize: 'inherit',
	},
	headingWrapper: {
		marginBottom: space[0],
	},
});

export function ReturnsRenderer({ classes, returnDocumentation, heading }) {
	if (!returnDocumentation) {
		return null;
	}

	return (
		<div className={classes.root}>
			{heading && (
				<div className={classes.headingWrapper}>
					<Heading level={5}>Returns</Heading>
				</div>
			)}
			<Argument key={returnDocumentation.title} {...returnDocumentation} />
		</div>
	);
}

ReturnsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	returnDocumentation: PropTypes.shape({
		title: PropTypes.string.isRequired,
		type: PropTypes.object,
		description: PropTypes.string,
	}).isRequired,
	heading: PropTypes.bool,
};

export default Styled(styles)(ReturnsRenderer);
