import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import mapValues from 'lodash/mapValues';
import memoize from 'lodash/memoize';
import Styled from 'rsg-components/Styled';
import Link from 'rsg-components/Link';
import Text from 'rsg-components/Text';
import Para, { styles as paraStyles } from 'rsg-components/Para';
import MarkdownHeading from 'rsg-components/Markdown/MarkdownHeading';
import List from 'rsg-components/Markdown/List';
import Blockquote from 'rsg-components/Markdown/Blockquote';
import Pre from 'rsg-components/Markdown/Pre';
import Code from 'rsg-components/Code';
import Checkbox from 'rsg-components/Markdown/Checkbox';

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
// eslint-disable-next-line import/no-unresolved
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

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
		ul: {
			component: List,
		},
		ol: {
			component: List,
			props: {
				ordered: true,
			},
		},
		blockquote: {
			component: Blockquote,
		},
		code: {
			component: Code,
		},
		pre: {
			component: Pre,
		},
		input: {
			component: Checkbox,
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

const styles = ({ space, fontFamily, fontSize, color }) => ({
	base: {
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: 'inherit',
	},
	para: paraStyles({ space, color, fontFamily }).para,
	hr: {
		composes: '$para',
		borderWidth: [[0, 0, 1, 0]],
		borderColor: color.border,
		borderStyle: 'solid',
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
