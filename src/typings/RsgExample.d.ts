declare namespace Rsg {
	interface MarkdownExample {
		type: 'markdown';
		content: string;
		settings?: Record<string, any>;
	}

	interface CodeExample {
		evalInContext(a: string): () => any;
		type: 'code';
		content: string;
		settings?: Record<string, any>;
	}

	type Example = CodeExample | MarkdownExample;
}
