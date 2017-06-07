import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ space, fontFamily, fontSize, color }) => ({
	section: {
		marginBottom: space[4],
	},
	heading: {
		marginBottom: space[1],
		color: color.base,
		fontFamily: fontFamily.base,
		fontWeight: 'normal',
		fontSize: fontSize.h4,
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
					<h4 className={classes.heading}>Props</h4>
					{props}
				</div>}
			{methods &&
				<div className={classes.section}>
					<h4 className={classes.heading}>Methods</h4>
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
