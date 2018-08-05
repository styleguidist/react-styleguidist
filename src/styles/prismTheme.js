const prismTheme = ({ color }) => ({
	[`& .token.comment,
& .token.prolog,
& .token.doctype,
& .token.cdata`]: {
		color: color.codeComment,
	},
	[`& .token.punctuation`]: {
		color: color.codePunctuation,
	},
	[`& .namespace`]: {
		opacity: 0.7,
	},
	[`& .token.property,
& .token.tag,
& .token.boolean,
& .token.number,
& .token.constant,
& .token.symbol`]: {
		color: color.codeProperty,
	},
	[`& .token.deleted`]: {
		color: color.codeDeleted,
	},
	[`& .token.selector,
& .token.attr-name,
& .token.string,
& .token.char,
& .token.builtin`]: {
		color: color.codeString,
	},
	[`& .token.inserted`]: {
		color: color.codeInserted,
	},
	[`& .token.operator,
& .token.entity,
& .token.url,
& .language-css .token.string,
& .style .token.string`]: {
		color: color.codeOperator,
	},
	[`& .token.atrule,
& .token.attr-value,
& .token.keyword`]: {
		color: color.codeKeyword,
	},
	[`& .token.function,
& .token.class-name`]: {
		color: color.codeFunction,
	},
	[`& .token.regex,
& .token.important,
& .token.variable`]: {
		color: color.codeVariable,
	},
	[`& .token.important,
& .token.bold`]: {
		fontWeight: 'bold',
	},
	[`& .token.italic`]: {
		fontStyle: 'italic',
	},
	[`& .token.entity`]: {
		cursor: 'help',
	},
});

export default prismTheme;
