import commentParse, { Comment } from 'comment-parser';
import { parse as typeParse } from 'jsdoctypeparser';

function removeUndefinedKeys(obj: any) {
	Object.keys(obj).forEach(function (key) {
		(obj[key] && typeof obj[key] === 'object' && removeUndefinedKeys(obj[key])) ||
			((obj[key] === '' || obj[key] === undefined) && delete obj[key]);
	});
	return obj;
}

function parseType(type: string, options: { optional: boolean }) {
	return typeParse(type);
	// let compatibilityTypeWithReactDocGen = '';
	// switch (parsedType.type) {
	// 	case 'NAME':
	// 		compatibilityTypeWithReactDocGen = 'NameExpression'
	// 		break;
	// }
	// if(options.optional) {
	// 	return {
	// 		expression: {
	// 			name: parsedType.name,
	// 			type: compatibilityTypeWithReactDocGen
	// 		},
	// 		type: 'OptionalType'
	// 	}
	// }
	// return {
	// 	name: parsedType.name,
	// 	type: compatibilityTypeWithReactDocGen
	// }
}

export default function parseComment(docblock: string): Comment | undefined {
	const parsedComment = commentParse(`/** ${docblock} */`);
	if (parsedComment.length === 0) {
		return undefined;
	}
	const { description, line, source, tags } = parsedComment[0];
	return {
		description,
		line,
		source,
		tags: tags.map((tag) =>
			removeUndefinedKeys({
				title: tag.tag,
				description: tag?.name || null,
				type: tag.type ? parseType(tag.type, { optional: tag?.optional || false }) : undefined,
				optional: tag?.optional,
				default: tag?.default,
			})
		),
	};
}
