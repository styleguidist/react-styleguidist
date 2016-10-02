import React, { PropTypes } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';

const s = require('./Playground.css');

const PlaygroundRenderer = ({ code, showCode, evalInContext, onChange, onCodeToggle }) => (
	<div className={s.root}>
		<div className={s.preview}>
			<Preview code={code} evalInContext={evalInContext} />
		</div>
		{showCode ? (
			<div className={s.editor}>
				<Editor code={code} onChange={onChange} />
				<div className={s.hideCode} onClick={onCodeToggle}>
					hide code
				</div>
			</div>
		) : (
			<div className={s.showCode} onClick={onCodeToggle}>
				show code
			</div>
		)}
	</div>
);

PlaygroundRenderer.propTypes = {
	code: PropTypes.string.isRequired,
	showCode: PropTypes.bool.isRequired,
	evalInContext: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCodeToggle: PropTypes.func.isRequired,
};

export default PlaygroundRenderer;
