import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontSize, fontFamily, space }) => ({
	heading: {
		color: color.base,
		marginBottom: space[1],
		fontFamily: fontFamily.base,
		fontSize: fontSize.h4,
		fontWeight: 'normal',
	},
	section: {
		marginBottom: space[4],
	},
});

export function UsageRenderer({ classes, props, methods }) {
	if (!props && !methods) {
		return null;
	}

	return (
		<div>
			{props &&
				<div className={classes.section}>
					<h3 className={classes.heading}>Props</h3>
					{props}
				</div>}
			{methods &&
				<div className={classes.section}>
					<h3 className={classes.heading}>Methods</h3>
					{methods}
				</div>}
		</div>
	);
}

UsageRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	props: PropTypes.node,
	methods: PropTypes.node,
};

export default Styled(styles)(UsageRenderer);
