import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = () => ({
	input: {
		isolate: false,
		display: 'inline-block',
		verticalAlign: 'middle',
	},
});

export function InputRenderer({ classes, ...rest }) {
	return <input {...rest} className={classes.input} />;
}
InputRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(InputRenderer);
