import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, fontSize, color, space }) => ({
	root: {
		margin: space[2],
		lineHeight: 1.2,
		fontSize: fontSize.small,
	},
	stack: {
		color: color.error,
		whiteSpace: 'pre',
		fontFamily: fontFamily.monospace,
	},
	message: {
		color: color.error,
		fontFamily: fontFamily.base,
	},
});

export function ErrorRenderer({ classes, error, info }) {
	return (
		<div className={classes.root}>
			<pre className={classes.stack}>
				{error.toString()}
				{info.componentStack.toString()}
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
					</a>.
				</p>
			</div>
		</div>
	);
}

ErrorRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	info: PropTypes.shape({
		componentStack: PropTypes.any.isRequired,
	}).isRequired,
};

export default Styled(styles)(ErrorRenderer);
