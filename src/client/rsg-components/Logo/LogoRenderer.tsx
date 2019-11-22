import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }: RsgTheme) => ({
	logo: {
		color: color.base,
		margin: 0,
		fontFamily: fontFamily.base,
		fontSize: fontSize.h4,
		fontWeight: 'normal',
	},
});

export const LogoRenderer: React.FunctionComponent<JssInjectedProps> = ({ classes, children }) => {
	return <h1 className={classes.logo}>{children}</h1>;
};

export default Styled<JssInjectedProps>(styles)(LogoRenderer);
