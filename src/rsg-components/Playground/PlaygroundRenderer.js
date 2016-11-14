import React, { PropTypes } from 'react';
import cx from 'classnames';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';

const s = require('./Playground.css');

const PlaygroundRenderer = ({
	code,
	showCode,
	name,
	index,
	singleExample,
	evalInContext,
	onChange,
	onCodeToggle,
}) => {
	const positionCode = {
		[s.showCodeTotoRight]: singleExample,
		[s.showCodeToLeft]: !singleExample,
	};

	return (
		<div className={s.root}>
			<div className={s.preview}>
				<Preview code={code} evalInContext={evalInContext} />
			</div>
			{singleExample && <a className={s.exitIsolation} href={'#!/' + name}>⇽ Exit Isolation</a>}
			{showCode ? (
				<div>
					<Editor code={code} onChange={onChange} />
					<button type="button" className={cx(s.hideCode, positionCode)} onClick={onCodeToggle}>
						Hide code
					</button>
				</div>
			) : (
				<button type="button" className={cx(s.showCode, positionCode)} onClick={onCodeToggle}>
					Show code
				</button>
			)}
			{!singleExample && <a className={s.isolateExample} href={'#!/' + name + '/' + index}>Isolate Example ⇢</a>}
		</div>
	);
};

PlaygroundRenderer.propTypes = {
	code: PropTypes.string.isRequired,
	showCode: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	evalInContext: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCodeToggle: PropTypes.func.isRequired,
	singleExample: PropTypes.bool,
};

export default PlaygroundRenderer;
