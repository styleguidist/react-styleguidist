import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';
import { styles as linkStyles } from 'rsg-components/Link';

const styles = ({ color }) => ({
	a: linkStyles({ color }).link,
});

function Link({ classes, children, ...props }) {
	return (
		<a {...props} className={classes.a}>
			{children}
		</a>
	);
}

Link.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default {
	a: {
		component: Styled(styles)(Link),
	},
};
