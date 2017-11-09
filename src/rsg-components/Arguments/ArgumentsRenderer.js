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

export function ArgumentsRenderer({ classes, args, heading }) {
	if (args.length === 0) {
		return null;
	}

	return (
		<div className={classes.root}>
			{heading && (
				<div className={classes.headingWrapper}>
					<Heading level={5}>Arguments</Heading>
				</div>
			)}
			{args.map(arg => <Argument key={arg.name} {...arg} />)}
		</div>
	);
}

ArgumentsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	args: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.object,
			description: PropTypes.string,
		})
	).isRequired,
	heading: PropTypes.bool,
};

export default Styled(styles)(ArgumentsRenderer);
