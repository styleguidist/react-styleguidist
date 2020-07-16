import React from 'react';
import PropTypes from 'prop-types';
import { fontFamily, fontSize, color } from '../../styles/theme';

interface IframeErrorProps {
	message: string;
}

const IframeErrorRenderer: React.FC<IframeErrorProps> = ({ message }) => (
	<pre
		style={{
			margin: 0,
			lineHeight: 1.2,
			fontSize: fontSize.small,
			fontFamily: fontFamily.monospace.join(','),
			color: color.error,
			whiteSpace: 'pre-wrap',
		}}
	>
		{message}
	</pre>
);

IframeErrorRenderer.propTypes = {
	message: PropTypes.string.isRequired,
};

export default IframeErrorRenderer;
