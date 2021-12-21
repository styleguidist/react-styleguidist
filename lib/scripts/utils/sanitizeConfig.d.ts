import { ConfigSchemaOptions } from '../schemas/config';
/**
 * Validates and normalizes config.
 *
 * @param {object} config
 * @param {object} schema
 * @param {string} rootDir
 * @return {object}
 */
export default function sanitizeConfig<T extends Record<string, any>>(config: T, schema: Record<keyof T, ConfigSchemaOptions<T>>, rootDir: string): T;
