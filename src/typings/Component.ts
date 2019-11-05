import { Example } from './Example';

export interface Component {
	name?: string;
	visibleName?: string;
	props: {
		displayName: string;
		visibleName?: string;
		examples?: Example[];
		example?: Example[];
	};
	module?: number;
}
