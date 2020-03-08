import * as Rsg from '../../typings';

const prismTheme = ({ color }: Pick<Rsg.Theme, 'color'>) => ({
	'&': {
		color: color.codeBase,
	},
	[`& .token.comment,
& .token.prolog,
& .token.doctype,
& .token.cdata`]: {
		isolate: false,
		color: color.codeComment,
	},
	[`& .token.punctuation`]: {
		isolate: false,
		color: color.codePunctuation,
	},
	[`& .namespace`]: {
		isolate: false,
		opacity: 0.7,
	},
	[`& .token.property,
& .token.tag,
& .token.boolean,
& .token.number,
& .token.constant,
& .token.symbol`]: {
		isolate: false,
		color: color.codeProperty,
	},
	[`& .token.deleted`]: {
		isolate: false,
		color: color.codeDeleted,
	},
	[`& .token.selector,
& .token.attr-name,
& .token.string,
& .token.char,
& .token.builtin`]: {
		isolate: false,
		color: color.codeString,
	},
	[`& .token.inserted`]: {
		isolate: false,
		color: color.codeInserted,
	},
	[`& .token.operator,
& .token.entity,
& .token.url,
& .language-css .token.string,
& .style .token.string`]: {
		isolate: false,
		color: color.codeOperator,
	},
	[`& .token.atrule,
& .token.attr-value,
& .token.keyword`]: {
		isolate: false,
		color: color.codeKeyword,
	},
	[`& .token.function,
& .token.class-name`]: {
		isolate: false,
		color: color.codeFunction,
	},
	[`& .token.regex,
& .token.important,
& .token.variable`]: {
		isolate: false,
		color: color.codeVariable,
	},
	[`& .token.important,
& .token.bold`]: {
		isolate: false,
		fontWeight: 'bold',
	},
	[`& .token.italic`]: {
		isolate: false,
		fontStyle: 'italic',
	},
	[`& .token.entity`]: {
		isolate: false,
		cursor: 'help',
	},
});

export default prismTheme;
