import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

export const styles = ({ fontFamily, fontSize, color }: Rsg.Theme) => ({
	type: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.type,
	},
});

interface TypeProps extends JssInjectedProps {
	children: React.ReactNode;
}

export const TypeRenderer: React.FunctionComponent<TypeProps> = ({ classes, children }) => {
	return <span className={classes.type}>{children}</span>;
};

TypeRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any.isRequired,
};

export default Styled<TypeProps>(styles)(TypeRenderer);
