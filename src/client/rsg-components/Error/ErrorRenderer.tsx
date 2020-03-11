import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ fontFamily, fontSize, color, space }: Rsg.Theme) => ({
	root: {
		margin: space[2],
		lineHeight: 1.2,
		fontSize: fontSize.small,
	},
	stack: {
		color: color.error,
		whiteSpace: 'pre-wrap',
		fontFamily: fontFamily.monospace,
	},
	message: {
		color: color.error,
		fontFamily: fontFamily.base,
	},
});

interface ErrorProps extends JssInjectedProps {
	error: any;
	info: React.ErrorInfo;
}

export const ErrorRenderer: React.FunctionComponent<ErrorProps> = ({ classes, error, info }) => {
	return (
		<div className={classes.root}>
			<pre className={classes.stack}>
				{error.toString()}
				{info.componentStack}
			</pre>
			<div className={classes.message}>
				<p>
					This may be due to an error in a component you are overriding, or a bug in React
					Styleguidist.
				</p>
				<p>
					If you believe this is a bug,&nbsp;
					<a
						style={{ color: 'inherit' }}
						href="https://github.com/styleguidist/react-styleguidist/issues"
					>
						please submit an issue
					</a>
					.
				</p>
			</div>
		</div>
	);
};

ErrorRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	error: PropTypes.object.isRequired,
	info: PropTypes.any.isRequired,
};

export default Styled<ErrorProps>(styles)(ErrorRenderer);
