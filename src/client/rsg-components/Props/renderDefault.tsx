import React from 'react';
import Text from 'rsg-components/Text';
import Code from 'rsg-components/Code';
import { showSpaces, unquote, PropDescriptor } from './util';

const defaultValueBlacklist = ['null', 'undefined'];

export default function renderDefault(prop: PropDescriptor): React.ReactNode {
	// Workaround for issue https://github.com/reactjs/react-docgen/issues/221
	// If prop has defaultValue it can not be required
	if (prop.defaultValue) {
		const defaultValueString = showSpaces(unquote(String(prop.defaultValue.value)));
		if (prop.type || prop.flowType || prop.tsType) {
			const propName = prop.type
				? prop.type.name
				: prop.flowType
				? prop.flowType.type
				: prop.tsType && prop.tsType.type;

			if (defaultValueBlacklist.indexOf(prop.defaultValue.value) > -1) {
				return <Code>{defaultValueString}</Code>;
			} else if (propName === 'func' || propName === 'function') {
				return (
					<Text size="small" color="light" underlined title={defaultValueString}>
						Function
					</Text>
				);
			} else if (propName === 'shape' || propName === 'object') {
				try {
					// We eval source code to be able to format the defaultProp here. This
					// can be considered safe, as it is the source code that is evaled,
					// which is from a known source and safe by default
					// eslint-disable-next-line no-eval
					const object = eval(`(${prop.defaultValue.value})`);
					return (
						<Text size="small" color="light" underlined title={JSON.stringify(object, null, 2)}>
							Shape
						</Text>
					);
				} catch (e) {
					// eval will throw if it contains a reference to a property not in the
					// local scope. To avoid any breakage we fall back to rendering the
					// prop without any formatting
					return (
						<Text size="small" color="light" underlined title={prop.defaultValue.value}>
							Shape
						</Text>
					);
				}
			}
		}

		return <Code>{defaultValueString}</Code>;
	} else if (prop.required) {
		return (
			<Text size="small" color="light">
				Required
			</Text>
		);
	}
	return '';
}
