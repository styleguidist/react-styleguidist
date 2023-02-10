import React, { isValidElement, PropsWithChildren } from 'react';
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
		component: Link as React.FC,
	},
	h1: {
		component: MarkdownHeading as React.FC,
		props: {
			level: 1,
		},
	},
	h2: {
		component: MarkdownHeading as React.FC,
		props: {
			level: 2,
		},
	},
	h3: {
		component: MarkdownHeading as React.FC,
		props: {
			level: 3,
		},
	},
	h4: {
		component: MarkdownHeading as React.FC,
		props: {
			level: 4,
		},
	},
	h5: {
		component: MarkdownHeading as React.FC,
		props: {
			level: 5,
		},
	},
	h6: {
		component: MarkdownHeading as React.FC,
		props: {
			level: 6,
		},
	},
	p: {
		component: Para as React.FC,
		props: {
			semantic: 'p',
		},
	},
	em: {
		component: Text as React.FC,
		props: {
			semantic: 'em',
		},
	},
	strong: {
		component: Text as React.FC,
		props: {
			semantic: 'strong',
		},
	},
	ul: {
		component: List as React.FC,
	},
	ol: {
		component: List as React.FC,
		props: {
			ordered: true,
		},
	},
	blockquote: {
		component: Blockquote as React.FC,
	},
	code: {
		component: Code as React.FC,
	},
	pre: {
		component: Pre as React.FC<PropsWithChildren>,
	},
	input: {
		component: Checkbox as React.FC,
	},
	hr: {
		component: Hr as React.FC,
	},
	table: {
		component: Table as React.FC,
	},
	thead: {
		component: TableHead as React.FC,
	},
	th: {
		component: TableCell as React.FC,
		props: {
			header: true,
		},
	},
	tbody: {
		component: TableBody as React.FC,
	},
	tr: {
		component: TableRow as React.FC,
	},
	td: {
		component: TableCell as React.FC,
	},
	details: {
		component: Details as React.FC,
	},
	summary: {
		component: DetailsSummary as React.FC,
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
	const overrides = inline ? inlineOverrides : baseOverrides;
	return compiler(stripHtmlComments(text), { overrides, forceBlock: true });
};

Markdown.propTypes = {
	text: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Markdown;
