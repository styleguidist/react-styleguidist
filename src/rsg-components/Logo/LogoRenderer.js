import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ font }) => ({
	logo: {
		margin: 0,
		fontFamily: font,
		fontSize: 18,
		fontWeight: 'normal',
	},
});

export function LogoRenderer({ classes, children }) {
	return (
		<h1 className={classes.logo}>{children}</h1>
	);
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
