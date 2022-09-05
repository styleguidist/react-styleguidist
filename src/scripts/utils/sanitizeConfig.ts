import fs from 'fs';
import path from 'path';
import castArray from 'lodash/castArray';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isFinite from 'lodash/isFinite';
import map from 'lodash/map';
import listify from 'listify';
import kleur from 'kleur';
import { distance } from 'fastest-levenshtein';
import typeDetect from 'type-detect';
import loggerMaker from 'glogg';
import { stringify } from 'q-i';
import StyleguidistError from './error';
import { ConfigSchemaOptions } from '../schemas/config';

const logger = loggerMaker('rsg');

const typeCheckers: Record<string, (untypedObject: unknown) => boolean> = {
	number: isFinite,
	string: isString,
	boolean: isBoolean,
	array: Array.isArray,
	function: isFunction,
	object: isPlainObject,
	'file path': isString,
	'existing file path': isString,
	'directory path': isString,
	'existing directory path': isString,
};

const typesList = (types: string[]) => listify(types, { finalWord: 'or' });
const shouldBeFile = (types: string[]) => types.some((type) => type.includes('file'));
const shouldBeDirectory = (types: string[]) => types.some((type) => type.includes('directory'));
const shouldExist = (types: string[]) => types.some((type) => type.includes('existing'));

function isDirectory(pathString: string): boolean {
	try {
		return fs.lstatSync(pathString).isDirectory();
	} catch (e: any) {
		if (e.code !== 'ENOENT') {
			throw e;
		}
		return false;
	}
}

/**
 * Validates and normalizes config.
 *
 * @param {object} config
 * @param {object} schema
 * @param {string} rootDir
 * @return {object}
 */
export default function sanitizeConfig<T extends Record<string, any>>(
	config: T,
	schema: Record<keyof T, ConfigSchemaOptions<T>>,
	rootDir: string
): T {
	// Check for unknown fields
	map(config, (value, keyAny: keyof T) => {
		const key = keyAny as string;
		if (!schema[key]) {
			// Try to guess
			const possibleOptions = Object.keys(schema);
			const suggestedOption = possibleOptions.reduce((suggestion: string, option: string) => {
				const steps = distance(option, key);
				if (steps < 2) {
					return option;
				}
				return suggestion;
			}, '');

			throw new StyleguidistError(
				`Unknown config option ${kleur.bold(key)} was found, the value is:\n` +
					stringify(value) +
					(suggestedOption ? `\n\nDid you mean ${kleur.bold(suggestedOption)}?` : ''),
				suggestedOption
			);
		}
	});

	// Check all fields
	const safeConfig: Partial<T> = {};
	map(schema, (props, keyAny: keyof T) => {
		const key = keyAny as string;
		let value = config[key];

		// Custom processing
		if (props.process) {
			value = props.process(value, config, rootDir);
		}

		if (value === undefined) {
			// Default value
			value = props.default;

			// Check if the field is required
			const isRequired = isFunction(props.required) ? props.required(config) : props.required;
			if (isRequired) {
				const message = isString(isRequired)
					? isRequired
					: `${kleur.bold(key)} config option is required.`;
				throw new StyleguidistError(message, key);
			}
		} else if (props.deprecated) {
			logger.warn(`${key} config option is deprecated. ${props.deprecated}`);
		} else if (props.removed) {
			throw new StyleguidistError(`${kleur.bold(key)} config option was removed. ${props.removed}`);
		}

		if (value !== undefined && props.type) {
			const types = castArray(props.type);

			// Check type
			const hasRightType = types.some((type) => {
				if (!typeCheckers[type]) {
					throw new StyleguidistError(
						`Wrong type ${kleur.bold(type)} specified for ${kleur.bold(key)} in schema.`
					);
				}
				return typeCheckers[type](value);
			});
			if (!hasRightType) {
				const exampleValue = props.example || props.default;
				const example: Record<string, any> = {};
				if (exampleValue) {
					example[key] = exampleValue;
				}
				const exampleText = exampleValue
					? `
Example:

${stringify(example)}`
					: '';
				throw new StyleguidistError(
					`${kleur.bold(key)} config option should be ${typesList(types)}, received ${typeDetect(
						value
					)}.\n${exampleText}`,
					key
				);
			}

			// Absolutize paths
			if (isString(value) && (shouldBeFile(types) || shouldBeDirectory(types))) {
				value = path.resolve(rootDir, value);

				// Check for existence
				if (shouldExist(types)) {
					if (shouldBeFile(types) && !fs.existsSync(value)) {
						throw new StyleguidistError(
							`A file specified in ${kleur.bold(key)} config option does not exist:\n${value}`,
							key
						);
					}
					if (shouldBeDirectory(types) && !isDirectory(value)) {
						throw new StyleguidistError(
							`A directory specified in ${kleur.bold(key)} config option does not exist:\n${value}`,
							key
						);
					}
				}
			}
		}

		safeConfig[keyAny] = value;
	});

	return safeConfig as T;
}
