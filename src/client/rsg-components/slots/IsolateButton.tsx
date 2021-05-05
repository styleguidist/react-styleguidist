import React from 'react';
import PropTypes from 'prop-types';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import ToolbarButton from 'rsg-components/ToolbarButton';
import getUrl from '../../utils/getUrl';

export interface IsolateButtonProps {
	name: string;
	exampleIndex?: number | string;
	isolated?: boolean;
	href: string;
}

const IsolateButton = ({ name, exampleIndex, isolated, href }: IsolateButtonProps) => {
	if (isolated && !href) {
		return null;
	}

	const testID = exampleIndex ? `${name}-${exampleIndex}-isolate-button` : `${name}-isolate-button`;

	return isolated ? (
		<ToolbarButton href={href} title="Show all components" testId={testID}>
			<MdFullscreenExit />
		</ToolbarButton>
	) : (
		<ToolbarButton
			href={getUrl({ name, exampleIndex, isolated: true })}
			title="Open isolated"
			testId={testID}
		>
			<MdFullscreen />
		</ToolbarButton>
	);
};

IsolateButton.propTypes = {
	name: PropTypes.string.isRequired,
	exampleIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	isolated: PropTypes.bool,
};

export default IsolateButton;
