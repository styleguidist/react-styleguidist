import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'rsg-components/Editor';
import Link from 'rsg-components/Link';
import Preview from 'rsg-components/Preview';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontFamily, fontSize, borderRadius }) => ({
	root: {
		color: color.base,
		position: 'relative',
		marginBottom: space[4],
		border: [[1, color.border, 'solid']],
		borderRadius: [[borderRadius, borderRadius, 0, borderRadius]],
		marginTop: space[0],
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	preview: {
		marginBottom: space[0],
		padding: space[2],
	},
	codeToggle: {
		position: 'absolute',
		right: -1,
		margin: 0,
		padding: [[space[0], space[1]]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		lineHeight: 1,
		color: color.link,
		border: [[1, color.border, 'solid']],
		borderTop: 0,
		borderBottomLeftRadius: borderRadius,
		borderBottomRightRadius: borderRadius,
		cursor: 'pointer',
		'&:hover, &:active': {
			isolate: false,
			color: color.linkHover,
		},
	},
	showCode: {
		composes: '$codeToggle',
		backgroundColor: color.baseBackground,
	},
	hideCode: {
		composes: '$codeToggle',
		backgroundColor: color.codeBackground,
	},
	isolatedLink: {
		position: 'absolute',
		top: '-1.8rem',
		right: 0,
		padding: [[space[0], space[1]]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
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
	const hideCodeButton = (
		<div>
			<Editor code={code} onChange={onChange} />
			<button type="button" className={classes.hideCode} onClick={onCodeToggle}>
				Hide code
			</button>
		</div>
	);
	const showCodeButton = (
		<button type="button" className={classes.showCode} onClick={onCodeToggle}>
			Show code
		</button>
	);

	return (
		<div className={classes.root}>
			<div className={classes.preview} data-preview={name ? name : ''}>
				<div className={classes.isolatedLink}>
					{name &&
						(isolatedExample
							? <Link href={'#!/' + name}>⇽ Exit Isolation</Link>
							: <Link href={'#!/' + name + '/' + index}>Open isolated ⇢</Link>)}
				</div>
				<Preview code={code} evalInContext={evalInContext} />
			</div>
			{showCode ? hideCodeButton : showCodeButton}
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
