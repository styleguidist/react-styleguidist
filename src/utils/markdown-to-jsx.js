/*
 Based on https://github.com/yaycmyk/markdown-to-jsx

 - Increase level of heading by 2.
 - Server-rendered code highlight.
 - Custom className for code highlight.
 */

import React from 'react';
import get from 'lodash/get';
import unified from 'unified';
import parser from 'remark-parse';

const BLOCK_ELEMENT_TAGS = [
	'article',
	'header',
	'aside',
	'hgroup',
	'blockquote',
	'hr',
	'iframe',
	'body',
	'li',
	'map',
	'button',
	'object',
	'canvas',
	'ol',
	'caption',
	'output',
	'col',
	'p',
	'colgroup',
	'pre',
	'dd',
	'progress',
	'div',
	'section',
	'dl',
	'table',
	'td',
	'dt',
	'tbody',
	'embed',
	'textarea',
	'fieldset',
	'tfoot',
	'figcaption',
	'th',
	'figure',
	'thead',
	'footer',
	'tr',
	'form',
	'ul',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'video',
	'script',
	'style',
];
const BLOCK_ELEMENT_REGEX = new RegExp(`^<(${BLOCK_ELEMENT_TAGS.join('|')})`, 'i');

// [0] === tag, [...] = attribute pairs
const HTML_EXTRACTOR_REGEX = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
const SELF_CLOSING_ELEMENT_TAGS = [
	'area',
	'base',
	'br',
	'col',
	'command',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
];
const SELF_CLOSING_ELEMENT_REGEX = new RegExp(`^<(${SELF_CLOSING_ELEMENT_TAGS.join('|')})`, 'i');
const TEXT_AST_TYPES = ['text', 'textNode'];

const ATTRIBUTE_TO_JSX_PROP_MAP = {
	'accept-charset': 'acceptCharset',
	'accesskey': 'accessKey',
	'allowfullscreen': 'allowFullScreen',
	'allowtransparency': 'allowTransparency',
	'autocomplete': 'autoComplete',
	'autofocus': 'autoFocus',
	'autoplay': 'autoPlay',
	'cellpadding': 'cellPadding',
	'cellspacing': 'cellSpacing',
	'charset': 'charSet',
	'class': 'className',
	'classid': 'classId',
	'colspan': 'colSpan',
	'contenteditable': 'contentEditable',
	'contextmenu': 'contextMenu',
	'crossorigin': 'crossOrigin',
	'enctype': 'encType',
	'for': 'htmlFor',
	'formaction': 'formAction',
	'formenctype': 'formEncType',
	'formmethod': 'formMethod',
	'formnovalidate': 'formNoValidate',
	'formtarget': 'formTarget',
	'frameborder': 'frameBorder',
	'hreflang': 'hrefLang',
	'http-equiv': 'httpEquiv',
	'inputmode': 'inputMode',
	'keyparams': 'keyParams',
	'keytype': 'keyType',
	'marginheight': 'marginHeight',
	'marginwidth': 'marginWidth',
	'maxlength': 'maxLength',
	'mediagroup': 'mediaGroup',
	'minlength': 'minLength',
	'novalidate': 'noValidate',
	'radiogroup': 'radioGroup',
	'readonly': 'readOnly',
	'rowspan': 'rowSpan',
	'spellcheck': 'spellCheck',
	'srcdoc': 'srcDoc',
	'srclang': 'srcLang',
	'srcset': 'srcSet',
	'tabindex': 'tabIndex',
	'usemap': 'useMap',
};

const getType = Object.prototype.toString;

function extractDefinitionsFromASTTree(ast, parser) {
	function reducer(aggregator, node) {
		if (node.type === 'definition' || node.type === 'footnoteDefinition') {
			aggregator.definitions[node.identifier] = node;

			if (node.type === 'footnoteDefinition') {
				if (node.children &&
					node.children.length === 1 &&
					node.children[0].type === 'paragraph'
				) {
					node.children[0].children.unshift({
						type: 'textNode',
						value: `[${node.identifier}]: `,
					});
				}
				/* package the prefix inside the first child */

				aggregator.footnotes.push(
					<div key={node.identifier} id={node.identifier}>
						{node.value || node.children.map(parser)}
					</div>
				);
			}
		}

		return Array.isArray(node.children)
			? node.children.reduce(reducer, aggregator)
			: aggregator;
	}

	return [ast].reduce(reducer, {
		definitions: {},
		footnotes: [],
	});
}

function formExtraPropsForHTMLNodeType(props = {}, ast, definitions) {
	switch (ast.type) {
		case 'footnoteReference':
			return {
				...props,
				href: `#${ast.identifier}`,
			};

		case 'image':
			return {
				...props,
				title: ast.title,
				alt: ast.alt,
				src: ast.url,
			};

		case 'imageReference':
			return {
				...props,
				title: get(definitions, `['${ast.identifier}'].title`),
				alt: ast.alt,
				src: get(definitions, `['${ast.identifier}'].url`),
			};

		case 'link':
			return {
				...props,
				title: ast.title,
				href: ast.url,
			};

		case 'linkReference':
			return {
				...props,
				title: get(definitions, `['${ast.identifier}'].title`),
				href: get(definitions, `['${ast.identifier}'].url`),
			};

		case 'list':
			return {
				...props,
				start: ast.start,
			};

		case 'tableCell':
		case 'th':
			return {
				...props,
				style: { textAlign: ast.align },
			};

		default:
			return props;
	}
}

function getHTMLNodeTypeFromASTNodeType(node) {
	switch (node.type) {
		case 'break':
			return 'br';

		case 'delete':
			return 'del';

		case 'emphasis':
			return 'em';

		case 'footnoteReference':
			return 'a';

		// Increase level of headings
		case 'heading':
			const depth = Math.min(node.depth + 2, 6);
			return `h${depth}`;

		case 'image':
		case 'imageReference':
			return 'img';

		case 'inlineCode':
			return 'code';

		case 'link':
		case 'linkReference':
			return 'a';

		case 'list':
			return node.ordered ? 'ol' : 'ul';

		case 'listItem':
			return 'li';

		case 'paragraph':
			return 'p';

		case 'root':
			return 'div';

		case 'tableHeader':
			return 'thead';

		case 'tableRow':
			return 'tr';

		case 'tableCell':
			return 'td';

		case 'thematicBreak':
			return 'hr';

		case 'definition':
		case 'footnoteDefinition':
		case 'yaml':
			return null;

		default:
			return node.type;
	}
}

function seekCellsAndAlignThemIfNecessary(root, alignmentValues) {
	const mapper = (child, index) => {
		if (child.type === 'tableCell') {
			return {
				...child,
				align: alignmentValues[index],
			};
		}
		else if (Array.isArray(child.children) && child.children.length) {
			return child.children.map(mapper);
		}

		return child;
	};

	if (Array.isArray(root.children) && root.children.length) {
		root.children = root.children.map(mapper);
	}

	return root;
}

function attributeValueToJSXPropValue(key, value) {
	if (key === 'style') {
		return value.split(/;\s?/).reduce((styles, kvPair) => {
			const key = kvPair.slice(0, kvPair.indexOf(':'));

			// snake-case to camelCase
			// also handles PascalCasing vendor prefixes
			const camelCasedKey = key.replace(/(-[a-z])/g, (substr) => substr[1].toUpperCase());

			// key.length + 1 to skip over the colon
			styles[camelCasedKey] = kvPair.slice(key.length + 1).trim();

			return styles;
		}, {});
	}

	return value;
}

function coalesceInlineHTML(ast) {
	function coalescer(node, index, siblings) {
		if (node.type === 'html') {
			// ignore block-level elements
			if (BLOCK_ELEMENT_REGEX.test(node.value)) {
				return;
			}

			// ignore self-closing or non-content-bearing elements
			if (SELF_CLOSING_ELEMENT_REGEX.test(node.value)) {
				return;
			}

			// are there more html nodes directly after? if so, fold them into the current node
			if (index < siblings.length - 1 && siblings[index + 1].type === 'html') {
				// create a new coalescer context
				coalescer(siblings[index + 1], index + 1, siblings);
			}

			let idx = index + 1;
			let end;

			// where's the end tag?
			while (end === undefined && idx < siblings.length) {
				if (siblings[idx].type !== 'html') {
					idx += 1;
					continue;
				}

				end = siblings[idx];
			}

			/* all interim elements now become children of the current node, and we splice them (including end tag)
			 out of the sibling array so they will not be iterated-over by forEach */

			node.children = siblings.slice(index + 1, idx);
			siblings.splice(index + 1, idx - index);

			const [tag, ...attributePairs] = node.value.match(HTML_EXTRACTOR_REGEX);

			// reassign the current node to whatever its tag is
			node.type = tag.toLowerCase();

			// make a best-effort conversion to JSX props
			node.props = attributePairs.reduce(function(props, kvPair) {
				const valueIndex = kvPair.indexOf('=');
				const key = kvPair.slice(0, valueIndex === -1 ? undefined : valueIndex);

				// ignoring inline event handlers at this time - they pose enough of a security risk that they're
				// not worth preserving; there's a reason React calls it "dangerouslySetInnerHTML"!

				if (key.indexOf('on') !== 0) {
					let value = kvPair.slice(key.length + 1);

					// strip the outermost single/double quote if it exists
					if (value[0] === '"' || value[0] === '\'') {
						value = value.slice(1, value.length - 1);
					}

					props[ATTRIBUTE_TO_JSX_PROP_MAP[key] || key] = attributeValueToJSXPropValue(key, value) || true;
				}

				return props;
			}, {});

			// null out .value or astToJSX() will set it as the child
			node.value = null;
		}

		if (node.children) {
			node.children.forEach(coalescer);
		}
	}

	return ast.children.forEach(coalescer);
}

export default function markdownToJSX(markdown, { overrides = {} } = {}) {
	let definitions;
	let footnotes;

	function astToJSX(ast, index) { /* `this` is the dictionary of definitions */
		if (TEXT_AST_TYPES.indexOf(ast.type) !== -1) {
			return ast.value;
		}

		const key = index || '0';

		if (ast.type === 'code' && ast.value) {
			const className = get(overrides, 'pre.props.className');
			return (
				<pre key={key} className={className}>
					<code className={`lang-${ast.lang}`} dangerouslySetInnerHTML={{ __html: ast.value }} ></code>
				</pre>
			);
		}
		/* Refers to fenced blocks, need to create a pre:code nested structure */

		if (ast.type === 'list' && ast.loose === false) {
			ast.children = ast.children.map(item => {
				if (item.children.length === 1 && item.children[0].type === 'paragraph') {
					return {
						...item,
						children: item.children[0].children,
					};
				}

				return item;
			});
		}
		/* tight list, remove the paragraph wrapper just inside the listItem */

		if (ast.type === 'listItem') {
			if (ast.checked === true || ast.checked === false) {
				return (
					<li key={key}>
						<input
							key="checkbox"
							type="checkbox"
							checked={ast.checked}
							disabled
						/>
						{ast.children.map(astToJSX)}
					</li>
				);
			}
			/* gfm task list, need to add a checkbox */
		}

		if (ast.type === 'html') {
			return (
				<div key={key} dangerouslySetInnerHTML={{ __html: ast.value }} />
			);
		}
		/* arbitrary HTML, do the gross thing for now */

		if (ast.type === 'table') {
			const tbody = { type: 'tbody', children: [] };

			ast.children = ast.children.reduce((children, child, index) => {
				if (index === 0) {
					// manually marking the first row as tableHeader since that was removed in remark@4.x;
					// it's important semantically.
					child.type = 'tableHeader';
					children.unshift(
						seekCellsAndAlignThemIfNecessary(child, ast.align)
					);
				}
				else if (child.type === 'tableRow') {
					tbody.children.push(
						seekCellsAndAlignThemIfNecessary(child, ast.align)
					);
				}
				else if (child.type === 'tableFooter') {
					children.push(
						seekCellsAndAlignThemIfNecessary(child, ast.align)
					);
				}

				return children;
			}, [tbody]);
		}
		/* React yells if things aren't in the proper structure, so need to
		 delve into the immediate children and wrap tablerow(s) in a tbody */

		if (ast.type === 'tableFooter') {
			ast.children = [{
				type: 'tr',
				children: ast.children,
			}];
		}
		/* React yells if things aren't in the proper structure, so need to
		 delve into the immediate children and wrap the cells in a tablerow */

		if (ast.type === 'tableHeader') {
			ast.children = [{
				type: 'tr',
				children: ast.children.map(child => {
					if (child.type === 'tableCell') {
						child.type = 'th';
					}
					/* et voila, a proper table header */

					return child;
				}),
			}];
		}
		/* React yells if things aren't in the proper structure, so need to
		 delve into the immediate children and wrap the cells in a tablerow */

		if (ast.type === 'footnoteReference') {
			ast.children = [{ type: 'sup', value: ast.identifier }];
		}
		/* place the identifier inside a superscript tag for the link */

		let htmlNodeType = getHTMLNodeTypeFromASTNodeType(ast);
		if (htmlNodeType === null) {
			return null;
		}
		/* bail out, not convertable to any HTML representation */

		let props = { key, ...ast.props };

		const override = overrides[htmlNodeType];
		if (override) {
			if (override.component) {
				htmlNodeType = override.component;
			}
			/* sub out the normal html tag name for the JSX / ReactFactory
			 passed in by the caller */

			if (override.props) {
				props = { ...override.props, ...props };
			}
			/* apply the prop overrides beneath the minimal set that are necessary
			 to have the markdown conversion work as expected */
		}

		/* their props + our props, with any duplicate keys overwritten by us
		 (necessary evil, file an issue if something comes up that needs
		 extra attention, only props specified in `formExtraPropsForHTMLNodeType`
		 will be overwritten on a key collision) */
		const finalProps = formExtraPropsForHTMLNodeType(props, ast, definitions);

		if (ast.children && ast.children.length === 1) {
			if (TEXT_AST_TYPES.indexOf(ast.children[0].type) !== -1) {
				ast.children = ast.children[0].value;
			}
		}
		/* solitary text children don't need full parsing or React will add a wrapper */

		const children = Array.isArray(ast.children)
			? ast.children.map(astToJSX)
			: ast.children;

		return React.createElement(htmlNodeType, finalProps, ast.value || children);
	}

	if (typeof markdown !== 'string') {
		throw new Error(`markdown-to-jsx: the first argument must be
						 a string`
		);
	}

	if (getType.call(overrides) !== '[object Object]') {
		throw new Error(`markdown-to-jsx: options.overrides (second argument property) must be
						 undefined or an object literal with shape:
						 {
							htmltagname: {
								component: string|ReactComponent(optional),
								props: object(optional)
							}
						 }`
		);
	}

	const remarkAST = unified()
		.use(parser)
		.parse(markdown, {
			footnotes: true,
			gfm: true,
			position: false,
		});

	const extracted = extractDefinitionsFromASTTree(remarkAST, astToJSX);

	definitions = extracted.definitions;
	footnotes = extracted.footnotes;

	coalesceInlineHTML(remarkAST);

	let jsx = astToJSX(remarkAST);

	// discard the root <div> node if there is only one valid initial child
	// generally this is a paragraph
	if (jsx.props.children.length === 1) {
		jsx = jsx.props.children[0];
	}

	if (footnotes.length) {
		jsx.props.children.push(
			<footer key="footnotes">{footnotes}</footer>
		);
	}

	return jsx;
}
