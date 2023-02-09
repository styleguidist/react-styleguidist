import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

export const styles = ({ fontFamily, fontSize, color }: Rsg.Theme) => ({
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
	children: React.ReactNode;
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

NameRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled<NameProps>(styles)(NameRenderer);
