import React from 'react';
import copy from 'clipboard-copy';
import { MdContentCopy } from 'react-icons/md';
import ToolbarButton from 'rsg-components/ToolbarButton';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

export const styles = ({ space, fontFamily, fontSize, color }: Rsg.Theme) => ({
	pathline: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.light,
		wordBreak: 'break-all',
	},
	copyButton: {
		marginLeft: space[0],
	},
});

interface Props extends JssInjectedProps {
	children?: React.ReactNode;
}

export const PathlineRenderer = ({ classes, children }: Props) => {
	return (
		<div className={classes.pathline}>
			{children}
			<ToolbarButton
				small
				className={classes.copyButton}
				onClick={() => children && copy(children.toString())}
				title="Copy to clipboard"
			>
				<MdContentCopy />
			</ToolbarButton>
		</div>
	);
};

export default Styled<JssInjectedProps>(styles)(PathlineRenderer);
