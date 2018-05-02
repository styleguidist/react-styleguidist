import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import Link from 'rsg-components/Link';
import Text from 'rsg-components/Text';
import Para from 'rsg-components/Para';
import MarkdownHeading from 'rsg-components/Markdown/MarkdownHeading';
import List from 'rsg-components/Markdown/List';
import Blockquote from 'rsg-components/Markdown/Blockquote';
import Pre from 'rsg-components/Markdown/Pre';
import Code from 'rsg-components/Code';
import Checkbox from 'rsg-components/Markdown/Checkbox';
import Hr from 'rsg-components/Markdown/Hr';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'rsg-components/Markdown/Table';

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
// eslint-disable-next-line import/no-unresolved
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

export const baseOverrides = {
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

export const inlineOverrides = {
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
