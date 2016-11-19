import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ font }) => ({
	logo: {
		margin: 0,
		fontFamily: font,
		fontSize: 18,
		fontWeight: 'normal',
	},
});

export const LogoRenderer = ({ classes, children }) => (
	<h1 className={classes.logo}>{children}</h1>
);

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
