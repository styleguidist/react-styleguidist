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
			heading?: boolean;
			filepath?: string;
			pathLine?: string;
			shouldOpenInNewTab?: boolean;
			forceOpen?: boolean;
			description?: string;
			exampleMode?: string;
			usageMode?: string;
		}

		interface Component extends BaseComponent {
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
			content?: React.ReactNode;
			visibleName?: string;
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
