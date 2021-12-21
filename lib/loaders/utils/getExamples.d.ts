import * as Rsg from '../../typings';
/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 */
export default function getExamples(file: string, displayName: string, examplesFile?: string | false, defaultExample?: string | false): Rsg.RequireItResult | null;
