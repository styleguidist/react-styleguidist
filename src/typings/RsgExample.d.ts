declare namespace Rsg {
	interface MarkdownExample {
		type: 'markdown';
		content: string;
		settings?: Record<string, any>;
	}

	interface CodeExample {
		content: string;
		lang?: string | null;
		settings?: Record<string, any>;
	}

	interface RuntimeCodeExample extends CodeExample {
		type: 'code';
		evalInContext(a: string): () => any;
	}

	type Example = RuntimeCodeExample | MarkdownExample | string;
}
