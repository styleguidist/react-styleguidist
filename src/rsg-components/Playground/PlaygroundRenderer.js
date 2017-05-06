import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'rsg-components/Editor';
import Link from 'rsg-components/Link';
import Preview from 'rsg-components/Preview';
import Styled from 'rsg-components/Styled';

const styles = ({ base, font, link, linkHover, border, baseBackground, codeBackground, spacing }) => ({
	root: {
		color: base,
		position: 'relative',
		marginBottom: spacing.space32,
		border: [[1, border, 'solid']],
		borderRadius: '3px 3px 0 3px',
		marginTop: spacing.space4,
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	preview: {
		marginBottom: spacing.space4,
		padding: spacing.space16,
	},
	codeToggle: {
		position: 'absolute',
		right: -1,
		margin: 0,
		padding: [[spacing.space4, spacing.space8]],
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
		padding: [[spacing.space4, spacing.space8]],
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
			<div className={classes.preview} data-preview={name ? name : ''}>
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
