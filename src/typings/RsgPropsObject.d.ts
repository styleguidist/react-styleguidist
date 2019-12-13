import { DocumentationObject, MethodDescriptor, PropDescriptor } from 'react-docgen';

declare global {
	namespace Rsg {
		interface MethodWithDocblock extends MethodDescriptor {
			docblock: string;
		}

		interface TempPropsObject extends DocumentationObject {
			displayName: string;
			visibleName?: string;
			methods?: MethodWithDocblock[];
			doclets: Record<string, any>;
			example?: RequireItResult | null;
		}

		interface PropsObject extends Omit<TempPropsObject, 'props'> {
			props?: Record<string, PropDescriptor> | PropDescriptor[];
			examples?: RequireItResult | null;
		}
	}
}
