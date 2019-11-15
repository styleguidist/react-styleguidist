import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import stripHtmlComments from 'strip-html-comments';
import Link from 'rsg-components/Link';
import Text from 'rsg-components/Text';
import Para from 'rsg-components/Para';
import MarkdownHeading from 'rsg-components/Markdown/MarkdownHeading';
import List from 'rsg-components/Markdown/List';
import Blockquote from 'rsg-components/Markdown/Blockquote';
import PreBase, { PreProps } from 'rsg-components/Markdown/Pre';
import Code from 'rsg-components/Code';
import Checkbox from 'rsg-components/Markdown/Checkbox';
import Hr from 'rsg-components/Markdown/Hr';
import { Details, DetailsSummary } from 'rsg-components/Markdown/Details';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'rsg-components/Markdown/Table';

const Pre = (props: PreProps) => {
	if (isValidElement(props.children)) {
		// Avoid rendering <Code> inside <Pre>
		return <PreBase {...props.children.props} />;
	}
	return <PreBase {...props} />;
};
Pre.propTypes = {
	children: PropTypes.node,
};

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
	details: {
		component: Details,
	},
	summary: {
		component: DetailsSummary,
	},
};

export const inlineOverrides = {
	...baseOverrides,
	p: {
		component: Text,
	},
};

interface MarkdownProps {
	text: string;
	inline?: boolean;
}

export const Markdown: React.FunctionComponent<MarkdownProps> = ({ text, inline }) => {
	// FIXME: this any is necessary as typings for overrides only accept ClassComponent
	const overrides = (inline ? inlineOverrides : baseOverrides) as any;
	return compiler(stripHtmlComments(text), { overrides, forceBlock: true });
};

Markdown.propTypes = {
	text: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Markdown;
