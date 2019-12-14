import { MethodDescriptor, PropDescriptor, TagProps } from 'react-docgen';

// global is necessary to allow imports
// see https://stackoverflow.com/questions/45099605/ambient-declaration-with-an-imported-type-in-typescript
declare global {
	namespace Rsg {
		interface BaseComponent {
			hasExamples?: boolean;
			name?: string;
			slug?: string;
			href?: string;
			filepath?: string;
			pathLine?: string;
			description?: string;
			exampleMode?: EXPAND_MODE;
			usageMode?: EXPAND_MODE;
		}

		interface Component extends BaseComponent {
			visibleName?: string;
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
			module?: number;
			metadata?: {
				tags?: string[];
			};
		}

		interface LoaderComponent extends BaseComponent {
			module: RequireItResult;
			props: RequireItResult;
			metadata: RequireItResult | {};
		}
	}
}
