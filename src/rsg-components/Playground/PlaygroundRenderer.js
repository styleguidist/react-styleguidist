import React from 'react';
import PropTypes from 'prop-types';
import { MdFullscreen, MdFullscreenExit, MdArrowDropDown, MdArrowDropUp } from 'react-icons/lib/md';
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
	},
	preview: {
		marginBottom: space[0],
		padding: space[2],
	},
	codeToggle: {
		outline: 'none',
		border: 'none',
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.light,
		transition: 'all 200ms ease',
		cursor: 'pointer',
		'&:hover': {
			color: color.linkHover,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
		},
	},
	toolbar: {
		display: 'flex',
		padding: [[space[0], space[2]]],
		'& > *:not(:last-child)': {
			marginRight: space[1],
		},
	},
	icons: {
		width: 20,
		height: 20,
		color: color.light,
		transition: 'all 200ms ease',
		'&:hover': {
			width: 20,
			height: 20,
			color: color.linkHover,
		},
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
				<Preview code={code} evalInContext={evalInContext} />
			</div>
			<section className={classes.toolbar}>
				<div>
					{name && (
					isolatedExample ? (
						<Link href={'/'}><MdFullscreenExit className={classes.icons} /></Link>
					) : (
						<Link href={'#!/' + name + '/' + index}>
							<MdFullscreen className={classes.icons} />
						</Link>
					)
				)}
				</div>
				<button type="button" className={classes.codeToggle} onClick={onCodeToggle}>
					{ showCode ? 'Hide' : 'Show'} code
							{ showCode
								? <MdArrowDropUp className={classes.icons} />
								: <MdArrowDropDown className={classes.icons} />
							}
				</button>
			</section>
			{showCode && <Editor code={code} onChange={onChange} />}
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
