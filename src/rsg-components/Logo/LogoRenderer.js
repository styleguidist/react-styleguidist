import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

import './index.scss';

const styles = ({ color, fontFamily, fontSize }) => ({
	logo: {
		color: color.base,
		margin: 0,
		fontFamily: fontFamily.base,
		fontSize: fontSize.h4,
		fontWeight: 'normal',
	},
});

export function LogoRenderer({ classes, children }) {
	return (
		<div className="logo">
			<h1 className="logo__title">{children}</h1>
		</div>
	)
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
