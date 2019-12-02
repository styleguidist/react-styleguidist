import { MethodDescriptor, PropDescriptor, TagProps } from 'react-docgen';

// global is necessary to allow imports
// see https://stackoverflow.com/questions/45099605/ambient-declaration-with-an-imported-type-in-typescript
declare global {
	namespace Rsg {
		interface Component {
			name?: string;
			slug?: string;
			href?: string;
			heading?: boolean;
			filepath?: string;
			pathLine?: string;
			visibleName?: string;
			content?: { props: { items: Component[] } };
			shouldOpenInNewTab?: boolean;
			forceOpen?: boolean;
			description?: string;
			exampleMode?: string;
			usageMode?: string;
			props?: {
				displayName?: string;
				visibleName?: string;
				description?: string;
				methods?: MethodDescriptor[];
				props?: PropDescriptor[];
				tags?: TagProps;
				example?: Example[];
				examples?: Example[];
			};
			metadata?: {
				tags?: string[];
			};
			module?: number;
		}
	}
}
