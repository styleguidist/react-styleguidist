import * as Rsg from '../../typings';
/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @param {Function} updateExample
 * @param {Array<string>} playgroundLangs
 * @returns {Array}
 */
export default function chunkify(markdown: string, updateExample?: (example: Omit<Rsg.CodeExample, 'type'>) => Omit<Rsg.CodeExample, 'type'>, playgroundLangs?: string[]): (Rsg.CodeExample | Rsg.MarkdownExample)[];
