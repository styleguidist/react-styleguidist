import React from 'react';
import cx from 'clsx';
import Styled, { JssInjectedProps, Theme } from 'rsg-components/Styled';

export const styles = ({ fontFamily, fontSize, color }: Theme) => ({
	name: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.name,
	},
	isDeprecated: {
		color: color.light,
		textDecoration: 'line-through',
	},
});

interface NameProps extends JssInjectedProps {
	deprecated?: boolean;
}

export const NameRenderer: React.FunctionComponent<NameProps> = ({
	classes,
	children,
	deprecated,
}) => {
	const classNames = cx(classes.name, {
		[classes.isDeprecated]: deprecated,
	});
	return <code className={classNames}>{children}</code>;
};

export default Styled(styles)(NameRenderer);
