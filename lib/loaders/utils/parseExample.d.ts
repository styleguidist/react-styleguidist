import * as Rsg from '../../typings';
export interface ExampleError {
    error: string;
}
/**
 * Split fenced code block header to lang and modifiers, parse modifiers, lowercase modifier keys, etc.
 */
export default function parseExample(content: string, lang?: string | null, modifiers?: string, updateExample?: (example: Omit<Rsg.CodeExample, 'type'>) => Omit<Rsg.CodeExample, 'type'>): Omit<Rsg.CodeExample, 'type'> | ExampleError;
