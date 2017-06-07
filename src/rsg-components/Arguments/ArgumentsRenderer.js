import React from 'react';
import PropTypes from 'prop-types';
import Argument from 'rsg-components/Argument';
import Styled from 'rsg-components/Styled';

export const styles = ({ space, color, fontFamily, fontSize }) => ({
	root: {
		marginBottom: space[2],
		fontSize: 'inherit',
	},
	heading: {
		marginBottom: space[0],
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		fontWeight: 'normal',
	},
});

export function ArgumentsRenderer({ classes, args, heading }) {
	if (args.length === 0) {
		return null;
	}

	return (
		<div className={classes.root}>
			{heading && <h5 className={classes.heading}>Arguments</h5>}
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
