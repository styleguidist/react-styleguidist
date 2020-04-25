import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../../typings';

const styles = ({ space, color }: Rsg.Theme) => ({
	hr: {
		borderBottom: [[1, color.border, 'solid']],
		marginTop: 0,
		marginBottom: space[2],
	},
});

export const HrRenderer: React.FunctionComponent<JssInjectedProps> = ({ classes }) => {
	return <hr className={classes.hr} />;
};
HrRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Styled<JssInjectedProps>(styles)(HrRenderer);
