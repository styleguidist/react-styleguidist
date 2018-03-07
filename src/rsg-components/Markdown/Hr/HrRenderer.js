import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color }) => ({
	hr: {
		borderBottom: [[1, color.border, 'solid']],
		marginTop: 0,
		marginBottom: space[2],
	},
});

export function HrRenderer({ classes }) {
	return <hr className={classes.hr} />;
}
HrRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(HrRenderer);
