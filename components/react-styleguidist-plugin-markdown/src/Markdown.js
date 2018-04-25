import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import Link from 'react-styleguidist-plugin-link';
import Text from 'react-styleguidist-plugin-text';
import Para from 'react-styleguidist-plugin-para';
import MarkdownHeading from './MarkdownHeading';
import List from './List';
import Blockquote from './Blockquote';
import Pre from './Pre';
import Code from 'react-styleguidist-plugin-code';
import Checkbox from 'react-styleguidist-plugin-markdown/Checkbox';
import Hr from 'react-styleguidist-plugin-markdown/Hr';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'react-styleguidist-plugin-markdown/table'

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
// eslint-disable-next-line import/no-unresolved
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

const baseOverrides = {
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
	hr: {
		component: Hr,
	},
	table: {
		component: Table,
	},
	thead: {
		component: TableHead,
	},
	th: {
		component: TableCell,
		props: {
			header: true,
		},
	},
	tbody: {
		component: TableBody,
	},
	tr: {
		component: TableRow,
	},
	td: {
		component: TableCell,
	},
};

const inlineOverrides = {
	...baseOverrides,
	p: {
		component: Text,
	},
};

function Markdown({ text, inline }) {
	const overrides = inline ? inlineOverrides : baseOverrides;
	return compiler(text, { overrides, forceBlock: true });
}

Markdown.propTypes = {
	text: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Markdown;
