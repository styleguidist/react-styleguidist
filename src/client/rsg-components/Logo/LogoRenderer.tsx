import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { ProcessedTheme } from '../../../typings/Theme';

const styles = ({ color, fontFamily, fontSize }: ProcessedTheme) => ({
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

export default Styled(styles)(LogoRenderer);
