import { MethodDescriptor, PropDescriptor, TagProps } from 'react-docgen';
import { Example } from './Example';

export interface RsgComponent {
	name?: string;
	slug?: string;
	href?: string;
	heading?: boolean;
	filepath?: string;
	pathLine?: string;
	visibleName?: string;
	content?: { props: { items: RsgComponent[] } };
	shouldOpenInNewTab?: boolean;
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
