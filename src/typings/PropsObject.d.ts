import { DocumentationObject, MethodDescriptor } from 'react-docgen';

declare global {
	namespace Rsg {
		interface MethodWithDocblock extends MethodDescriptor {
			docblock: string;
		}
		interface PropsObject extends DocumentationObject {
			visibleName?: string;
			methods?: MethodWithDocblock[];
			doclets: Record<string, any>;
			example?: RequireItResult;
		}
	}
}
