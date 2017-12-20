import React from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import mapValues from 'lodash/mapValues';
import memoize from 'lodash/memoize';
import Styled from 'rsg-components/Styled';
import Link from 'rsg-components/Link';
import Text from 'rsg-components/Text';
import Para, { styles as paraStyles } from 'rsg-components/Para';
import MarkdownHeading from 'rsg-components/Markdown/MarkdownHeading';

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
// eslint-disable-next-line import/no-unresolved
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

// Code blocks with server-side syntax highlight
function Code({ children, className }) {
	const isHighlighted = className && className.indexOf('lang-') !== -1;
	if (isHighlighted) {
		return <code className={className} dangerouslySetInnerHTML={{ __html: children }} />;
	}
	return <code className={className}>{children}</code>;
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
		a: {
			component: Link,
		},
		h1: {
			component: MarkdownHeading,
			props: {
				level: 1,
			},
		},
		h2: {
			component: MarkdownHeading,
			props: {
				level: 2,
			},
		},
		h3: {
			component: MarkdownHeading,
			props: {
				level: 3,
			},
		},
		h4: {
			component: MarkdownHeading,
			props: {
				level: 4,
			},
		},
		h5: {
			component: MarkdownHeading,
			props: {
				level: 5,
			},
		},
		h6: {
			component: MarkdownHeading,
			props: {
				level: 6,
			},
		},
		p: {
			component: Para,
			props: {
				semantic: 'p',
			},
		},
		em: {
			component: Text,
			props: {
				semantic: 'em',
			},
		},
		strong: {
			component: Text,
			props: {
				semantic: 'strong',
			},
		},
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
			component: Text,
		},
	};
}, () => 'getInlineOverrides');

const styles = ({ space, fontFamily, fontSize, color, borderRadius }) => ({
	base: {
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: 'inherit',
	},
	para: paraStyles({ space, color, fontFamily }).para,
	ul: {
		composes: '$para',
		paddingLeft: space[3],
	},
	ol: {
		composes: '$para',
		listStyleType: 'decimal',
		paddingLeft: space[3],
	},
	li: {
		composes: '$base',
		listStyleType: 'inherit',
	},
	input: {
		isolate: false,
		display: 'inline-block',
		verticalAlign: 'middle',
	},
	blockquote: {
		composes: '$para',
		fontSize: fontSize.base,
		margin: [[space[2], space[4]]],
		padding: 0,
	},
	hr: {
		composes: '$para',
		borderWidth: [[0, 0, 1, 0]],
		borderColor: color.border,
		borderStyle: 'solid',
	},
	code: {
		fontFamily: fontFamily.monospace,
		fontSize: 'inherit',
		color: 'inherit',
		background: 'transparent',
		whiteSpace: 'inherit',
	},
	pre: {
		composes: '$para',
		backgroundColor: color.codeBackground,
		border: [[1, color.border, 'solid']],
		padding: [[space[1], space[2]]],
		fontSize: fontSize.small,
		borderRadius,
		whiteSpace: 'pre',
	},
	table: {
		composes: '$para',
		borderCollapse: 'collapse',
	},
	thead: {
		composes: '$hr',
	},
	tbody: {},
	td: {
		fontFamily: fontFamily.base,
		padding: [[space[0], space[2], space[0], 0]],
		fontSize: fontSize.base,
	},
	th: {
		composes: '$td',
		fontWeight: 'bold',
	},
	tr: {},
});

function Markdown({ classes, text, inline }) {
	const overrides = inline ? getInlineOverrides(classes) : getBaseOverrides(classes);
	return compiler(text, { overrides, forceBlock: true });
}

Markdown.propTypes = {
	classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Styled(styles)(Markdown);
