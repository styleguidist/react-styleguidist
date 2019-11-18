import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps, Theme } from 'rsg-components/Styled';

export const styles = ({ fontFamily, fontSize, color }: Theme) => ({
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
	children: PropTypes.node.isRequired,
};

export default Styled<TypeProps>(styles)(TypeRenderer);
