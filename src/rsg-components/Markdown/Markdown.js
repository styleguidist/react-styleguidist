import React from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import mapValues from 'lodash/mapValues';
// import memoize from 'lodash/memoize';
import Styled from 'rsg-components/Styled';
import { styles as linkStyles } from 'rsg-components/Link';

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

// Temporary disable memoization to fix: https://github.com/styleguidist/react-styleguidist/issues/348
// TODO: Remove after merge: https://github.com/probablyup/markdown-to-jsx/pull/96
const memoize = a => a;

// Code blocks with server-side syntax highlight
function Code({ children, className }) {
	const isHighlighted = className && className.indexOf('lang-') !== -1;
	if (isHighlighted) {
		return (
			<code className={className} dangerouslySetInnerHTML={{ __html: children }} />
		);
	}
	return (
		<code className={className}>{children}</code>
	);
}
Code.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

// Custom CSS classes for each tag: <em> → <em className={s.em}> + custom components
const getBaseOverrides = memoize(classes => {
	const styleOverrides = mapValues(classes, value => ({
		props: {
			className: value,
		},
	}));

	return {
		...styleOverrides,
		code: {
			component: Code,
			props: {
				className: classes.code,
			},
		},
	};
}, () => 'getBaseOverrides');

// Inline mode: replace <p> (usual root component) with <span>
const getInlineOverrides = memoize(classes => {
	const overrides = getBaseOverrides(classes);

	return {
		...overrides,
		p: {
			component: 'span',
			props: {
				className: classes.base,
			},
		},
	};
}, () => 'getInlineOverrides');

const styles = ({ base, font, fonts, monospace, link, linkHover, border, codeBackground, spacing }) => ({
	base: {
		color: base,
		fontFamily: font,
		fontSize: 'inherit',
	},
	para: {
		color: base,
		fontFamily: font,
		fontSize: 'inherit',
		margin: [[0, 0, spacing.spacing16, 0]],
		lineHeight: 1.5,
	},
	a: linkStyles({ link, linkHover }).link,
	h1: {
		composes: '$para',
		fontSize: fonts.h1,
		fontWeight: 'normal',
	},
	h2: {
		composes: '$para',
		fontSize: fonts.h2,
		fontWeight: 'normal',
	},
	h3: {
		composes: '$para',
		fontSize: fonts.h3,
		fontWeight: 'normal',
	},
	h4: {
		composes: '$para',
		fontSize: fonts.h4,
		fontWeight: 'normal',
	},
	h5: {
		composes: '$para',
		fontSize: fonts.h5,
		fontWeight: 'normal',
	},
	h6: {
		composes: '$para',
		fontSize: fonts.h6,
		fontWeight: 'normal',
		fontStyle: 'italic',
	},
	p: {
		composes: '$para',
	},
	ul: {
		composes: '$para',
		paddingLeft: spacing[3],
	},
	ol: {
		composes: '$para',
		listStyleType: 'decimal',
		paddingLeft: spacing[3],
	},
	li: {
		composes: '$base',
		listStyleType: 'inherit',
	},
	input: {
		color: base,
		display: 'inline-block',
		margin: [[0, '0.35em', '0.25em', '-1.2em']],
		verticalAlign: 'middle',
	},
	blockquote: {
		composes: '$para',
		fontSize: fonts.size14,
		margin: [[spacing[2], spacing[4]]],
		padding: 0,
	},
	hr: {
		composes: '$para',
		borderWidth: [[0, 0, 1, 0]],
		borderColor: border,
		borderStyle: 'solid',
	},
	em: {
		composes: '$base',
		fontStyle: 'italic',
	},
	strong: {
		composes: '$base',
		fontWeight: 'bold',
	},
	code: {
		fontFamily: monospace,
		fontSize: 'inherit',
		color: 'inherit',
		background: 'transparent',
		whiteSpace: 'inherit',
	},
	pre: {
		composes: '$para',
		backgroundColor: codeBackground,
		border: [[1, border, 'solid']],
		padding: [[spacing[1], spacing[2]]],
		fontSize: fonts.size12,
		borderRadius: 3,
		whiteSpace: 'pre',
	},
	table: {
		composes: '$para',
		borderCollapse: 'collapse',
	},
	thead: {
		composes: '$hr',
	},
	tbody: {
	},
	td: {
		fontFamily: font,
		padding: [[spacing.half, spacing[2], spacing.half, 0]],
		fontSize: fonts.size14,
	},
	th: {
		composes: '$td',
		fontWeight: 'bold',
	},
	tr: {
	},
});

function Markdown({
	classes,
	text,
	inline,
}) {
	const overrides = inline ? getInlineOverrides(classes) : getBaseOverrides(classes);
	return compiler(text, { overrides });
}

Markdown.propTypes = {
	classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Styled(styles)(Markdown);
