import React, { PropTypes } from 'react';
import { compiler } from 'markdown-to-jsx';
import mapValues from 'lodash/mapValues';
import memoize from 'lodash/memoize';
import Styled from 'rsg-components/Styled';
import { styles as linkStyles } from 'rsg-components/Link';

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

// Code blocks with server-side syntax highlight
function Code({ children, className }) {
	const isHighlighted = className && className.includes('lang-');
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
});

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
});

const styles = ({ font, monospace, link, linkHover, border, codeBackground }) => ({
	base: {
		fontFamily: font,
		fontSize: 'inherit',
	},
	para: {
		fontFamily: font,
		fontSize: 'inherit',
		margin: [[0, 0, 15, 0]],
		lineHeight: 1.5,
	},
	a: linkStyles({ link, linkHover }).link,
	h1: {
		composes: '$para',
		fontSize: 36,
		fontWeight: 'normal',
	},
	h2: {
		composes: '$para',
		fontSize: 32,
		fontWeight: 'normal',
	},
	h3: {
		composes: '$para',
		fontSize: 26,
		fontWeight: 'normal',
	},
	h4: {
		composes: '$para',
		fontSize: 21,
		fontWeight: 'normal',
	},
	h5: {
		composes: '$para',
		fontSize: 16,
		fontWeight: 'normal',
	},
	h6: {
		composes: '$para',
		fontSize: 16,
		fontWeight: 'normal',
		fontStyle: 'italic',
	},
	p: {
		composes: '$para',
	},
	ul: {
		composes: '$para',
	},
	ol: {
		composes: '$para',
		listStyleType: 'decimal',
	},
	li: {
		composes: '$base',
		listStyleType: 'inherit',
	},
	input: {
		display: 'inline-block',
		margin: [[0, '0.35em', '0.25em', '-1.2em']],
		verticalAlign: 'middle',
	},
	blockquote: {
		composes: '$para',
		fontSize: 14,
		margin: [[15, 30]],
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
		backgroundColor: codeBackground,
		border: [[1, border, 'solid']],
		padding: [[12, 15]],
		fontSize: 12,
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
	td: {
		fontFamily: font,
		padding: [[6, 15, 6, 0]],
		fontSize: 14,
	},
	th: {
		composes: '$td',
		fontWeight: 'bold',
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
