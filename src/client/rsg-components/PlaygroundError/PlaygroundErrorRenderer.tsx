import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ fontFamily, fontSize, color }: Rsg.Theme) => ({
	root: {
		margin: 0,
		lineHeight: 1.2,
		fontSize: fontSize.small,
		fontFamily: fontFamily.monospace,
		color: color.error,
		whiteSpace: 'pre-wrap',
	},
});

interface PlaygroundErrorProps extends JssInjectedProps {
	message: string;
}

export const PlaygroundErrorRenderer: React.FunctionComponent<PlaygroundErrorProps> = ({
	classes,
	message,
}) => <pre className={classes.root}>{message}</pre>;

PlaygroundErrorRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	message: PropTypes.string.isRequired,
};

export default Styled<PlaygroundErrorProps>(styles)(PlaygroundErrorRenderer);
