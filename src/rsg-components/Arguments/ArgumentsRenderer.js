import React from 'react';
import PropTypes from 'prop-types';
import Argument from 'rsg-components/Argument';
import Styled from 'rsg-components/Styled';

export const styles = ({ space }) => ({
	root: {
		marginBottom: space[2],
		fontSize: 'inherit',
	},
});

export function ArgumentsRenderer({ classes, args }) {
	if (args.length === 0) {
		return null;
	}

	return (
		<div className={classes.root}>
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
};

export default Styled(styles)(ArgumentsRenderer);
