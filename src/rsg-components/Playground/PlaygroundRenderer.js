import React, { PropTypes } from 'react';
import Editor from 'rsg-components/Editor';
import Link from 'rsg-components/Link';
import Preview from 'rsg-components/Preview';
import Styled from 'rsg-components/Styled';

const styles = ({ font, link, linkHover, border, baseBackground, codeBackground }) => ({
	root: {
		isolate: false,
		position: 'relative',
		marginBottom: 30,
		border: [[1, border, 'solid']],
		borderRadius: '3px 3px 0 3px',
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	preview: {
		isolate: false,
		marginBottom: 3,
		padding: 15,
		overflow: 'auto',
	},
	codeToggle: {
		position: 'absolute',
		right: -1,
		margin: 0,
		padding: [[6, 8]],
		fontFamily: font,
		fontSize: 14,
		lineHeight: 1,
		color: link,
		border: [[1, border, 'solid']],
		borderTop: 0,
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3,
		cursor: 'pointer',
		'&:hover, &:active': {
			isolate: false,
			color: linkHover,
		},
	},
	showCode: {
		composes: '$codeToggle',
		backgroundColor: baseBackground,
	},
	hideCode: {
		composes: '$codeToggle',
		backgroundColor: codeBackground,
	},
	isolatedLink: {
		position: 'absolute',
		top: 0,
		right: 0,
		padding: [[6, 8]],
		fontFamily: font,
		fontSize: 14,
		opacity: 0,
		transition: 'opacity ease-in-out .15s .2s',
	},
});

export function PlaygroundRenderer({
	classes,
	code,
	showCode,
	name,
	index,
	isolatedExample,
	evalInContext,
	onChange,
	onCodeToggle,
}) {
	return (
		<div className={classes.root}>
			<div className={classes.preview} data-preview={name}>
				<div className={classes.isolatedLink}>
					{name && (
						isolatedExample ? (
							<Link href={'#!/' + name}>⇽ Exit Isolation</Link>
						) : (
							<Link href={'#!/' + name + '/' + index}>Open isolated ⇢</Link>
						)
					)}
				</div>
				<Preview code={code} evalInContext={evalInContext} />
			</div>
			{showCode ? (
				<div>
					<Editor code={code} onChange={onChange} />
					<button type="button" className={classes.hideCode} onClick={onCodeToggle}>
						Hide code
					</button>
				</div>
			) : (
				<button type="button" className={classes.showCode} onClick={onCodeToggle}>
					Show code
				</button>
			)}
		</div>
	);
}

PlaygroundRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	code: PropTypes.string.isRequired,
	showCode: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	evalInContext: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCodeToggle: PropTypes.func.isRequired,
	name: PropTypes.string,
	isolatedExample: PropTypes.bool,
};

export default Styled(styles)(PlaygroundRenderer);
