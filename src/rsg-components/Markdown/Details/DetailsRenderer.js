import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	details: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		marginBottom: space[2],
	},
	summary: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		marginBottom: space[1],
	},
});

export function DetailsRenderer({ classes }) {
	return (
		<details className={classes.details}>
			<summary className={classes.summary}>Solution</summary>
			Some hidden text.
		</details>
	);
}
DetailsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(DetailsRenderer);
