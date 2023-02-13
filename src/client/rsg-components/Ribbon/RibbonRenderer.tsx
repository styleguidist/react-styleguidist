import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

export const styles = ({ color, space, fontSize, fontFamily }: Rsg.Theme) => ({
	root: {
		position: 'fixed',
		top: 0,
		right: 0,
		width: 149,
		height: 149,
		zIndex: 999,
	},
	link: {
		fontFamily: fontFamily.base,
		position: 'relative',
		right: -37,
		top: -22,
		display: 'block',
		width: 190,
		padding: [[space[0], space[2]]],
		textAlign: 'center',
		color: color.ribbonText,
		fontSize: fontSize.base,
		background: color.ribbonBackground,
		textDecoration: 'none',
		textShadow: [[0, '-1px', 0, 'rgba(0,0,0,.15)']],
		transformOrigin: [[0, 0]],
		transform: 'rotate(45deg)',
		cursor: 'pointer',
	},
});

interface RibbonProps extends JssInjectedProps {
	url: string;
	text?: string;
}

export const RibbonRenderer: React.FunctionComponent<RibbonProps> = ({
	classes,
	url,
	text = 'Fork me on GitHub',
}) => {
	return (
		<footer className={classes.root}>
			<a href={url} className={classes.link}>
				{text}
			</a>
		</footer>
	);
};

export default Styled<RibbonProps>(styles)(RibbonRenderer);
