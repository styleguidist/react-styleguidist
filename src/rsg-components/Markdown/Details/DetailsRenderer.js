import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	details: {
		fontFamily: fontFamily.base,
		whiteSpace: 'details',
	},
	summary: {
		marginBottom: space[2],
		fontSize: fontSize.small,
		backgroundColor: color.codeBackground,
	},
});

export function DetailsRenderer({ classes }) {
	return (
		<details className={classes.details}>
			<summary>Solution</summary>
			Some hidden text.
		</details>
	);
}
DetailsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(DetailsRenderer);
