import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }: RsgTheme) => ({
	blockquote: {
		margin: [[space[2], space[4]]],
		padding: 0,
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		lineHeight: 1.5,
	},
});

interface BlockquoteProps extends JssInjectedProps {
	children: React.ReactNode;
	className?: string;
}

export const BlockquoteRenderer: React.FunctionComponent<BlockquoteProps> = ({
	classes,
	className,
	children,
}) => {
	const blockquoteClasses = cx(classes.blockquote, className);
	return <blockquote className={blockquoteClasses}>{children}</blockquote>;
};

BlockquoteRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Styled<BlockquoteProps>(styles)(BlockquoteRenderer);
