import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

const styles = ({ fontSize }) => ({
	logoText: {
		fontSize: fontSize.h4,
	},
});

function LogoRenderer({ classes, children }) {
	return (
		<Heading level={1}>
			<div className={classes.logoText}>{children}</div>
		</Heading>
	);
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
