import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';
import { styles as paraStyles } from 'rsg-components/Para';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	para: paraStyles({ space, color, fontFamily }).para,
	h1: {
		composes: '$para',
		fontSize: fontSize.h1,
		fontWeight: 'normal',
	},
	h2: {
		composes: '$para',
		fontSize: fontSize.h2,
		fontWeight: 'normal',
	},
	h3: {
		composes: '$para',
		fontSize: fontSize.h3,
		fontWeight: 'normal',
	},
	h4: {
		composes: '$para',
		fontSize: fontSize.h4,
		fontWeight: 'normal',
	},
	h5: {
		composes: '$para',
		fontSize: fontSize.h5,
		fontWeight: 'normal',
	},
	h6: {
		composes: '$para',
		fontSize: fontSize.h6,
		fontWeight: 'normal',
		fontStyle: 'italic',
	},
});

function Header({ level, classes, children, ...props }) {
	return React.createElement(
		level,
		{
			...props,
			className: classes[level],
		},
		children
	);
}

Header.propTypes = {
	level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

const StyledHeader = Styled(styles)(Header);

export default {
	h1: {
		component: StyledHeader,
		props: {
			level: 'h1',
		},
	},
	h2: {
		component: StyledHeader,
		props: {
			level: 'h2',
		},
	},
	h3: {
		component: StyledHeader,
		props: {
			level: 'h3',
		},
	},
	h4: {
		component: StyledHeader,
		props: {
			level: 'h4',
		},
	},
	h5: {
		component: StyledHeader,
		props: {
			level: 'h5',
		},
	},
	h6: {
		component: StyledHeader,
		props: {
			level: 'h6',
		},
	},
};
