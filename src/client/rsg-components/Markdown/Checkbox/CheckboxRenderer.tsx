import React from 'react';
import PropTypes from 'prop-types';

import Styled, { JssInjectedProps } from 'rsg-components/Styled';

const styles = () => ({
	input: {
		isolate: false,
		display: 'inline-block',
		verticalAlign: 'middle',
	},
});

export const CheckboxRenderer: React.FunctionComponent<JssInjectedProps> = ({
	classes,
	...rest
}) => {
	return <input {...rest} type="checkbox" className={classes.input} />;
};
CheckboxRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Styled(styles)(CheckboxRenderer);
