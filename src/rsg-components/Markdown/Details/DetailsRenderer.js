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

export function DetailsRenderer({ classes, tag, children }) {
	return (
		<details className={classes.details}>
			<summary>{tag}</summary>
			{children}
		</details>
	);
}
DetailsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	tag: PropTypes.string.isRequired,
};

export default Styled(styles)(DetailsRenderer);
