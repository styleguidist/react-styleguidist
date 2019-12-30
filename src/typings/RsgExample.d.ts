declare namespace Rsg {
	interface MarkdownExample {
		type: 'markdown';
		content: string;
		settings?: Record<string, any>;
	}

	interface CodeExample {
		type: 'code';
		content: string;
		lang?: string | null;
		settings?: Record<string, any>;
	}

	interface RuntimeCodeExample extends CodeExample {
		evalInContext(a: string): () => any;
		compiled: string;
	}

	type Example = RuntimeCodeExample | MarkdownExample;
}
