import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../../typings';

const styles = ({ space, color, fontSize, fontFamily }: Rsg.Theme) => ({
	details: {
		marginBottom: space[2],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
	},
});

interface DetailsProps extends JssInjectedProps {
	children: React.ReactNode;
}

export const DetailsRenderer: React.FunctionComponent<DetailsProps> = ({ classes, children }) => {
	return <details className={classes.details}>{children}</details>;
};

DetailsRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any.isRequired,
};

export default Styled<DetailsProps>(styles)(DetailsRenderer);
