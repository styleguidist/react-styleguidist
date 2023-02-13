import React from 'react';
import cx from 'clsx';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

export const styles = ({ fontFamily, fontSize, color }: Rsg.Theme) => ({
	text: {
		fontFamily: fontFamily.base,
	},
	inheritSize: {
		fontSize: 'inherit',
	},
	smallSize: {
		fontSize: fontSize.small,
	},
	baseSize: {
		fontSize: fontSize.base,
	},
	textSize: {
		fontSize: fontSize.text,
	},
	baseColor: {
		color: color.base,
	},
	lightColor: {
		color: color.light,
	},
	em: {
		fontStyle: 'italic',
	},
	strong: {
		fontWeight: 'bold',
	},
	isUnderlined: {
		borderBottom: [[1, 'dotted', color.lightest]],
	},
});

export interface TextProps extends JssInjectedProps {
	semantic?: 'em' | 'strong';
	size?: 'inherit' | 'small' | 'base' | 'text';
	color?: 'base' | 'light';
	underlined?: boolean;
	children: React.ReactNode;
	[intrinsicAttribute: string]: any;
}

export const TextRenderer: React.FunctionComponent<TextProps> = ({
	classes,
	semantic,
	size = 'inherit',
	color = 'base',
	underlined = false,
	children,
	...props
}) => {
	const Tag = semantic || 'span';
	const classNames = cx(classes.text, classes[`${size}Size`], classes[`${color}Color`], {
		[classes[Tag]]: !!semantic,
		[classes.isUnderlined]: underlined,
	});

	return (
		<Tag {...props} className={classNames}>
			{children}
		</Tag>
	);
};

export default Styled<TextProps>(styles)(TextRenderer);
