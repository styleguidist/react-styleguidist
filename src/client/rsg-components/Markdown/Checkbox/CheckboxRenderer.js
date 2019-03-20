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

export function CheckboxRenderer({ classes, ...rest }) {
	return <input {...rest} type="checkbox" className={classes.input} />;
}
CheckboxRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(CheckboxRenderer);
