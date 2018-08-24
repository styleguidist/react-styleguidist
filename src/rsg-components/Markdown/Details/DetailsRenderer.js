import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontFamily }) => ({
	details: {
		fontFamily: fontFamily.base,
		backgroundColor: color.codeBackground,
		padding: space[2],
		border: [[1, color.border, 'solid']],
		lineHeight: space[0],
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
