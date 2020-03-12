export interface MarkdownExample {
	type: 'markdown';
	content: string;
	settings?: Record<string, any>;
}

export interface CodeExample {
	type: 'code';
	content: string;
	lang?: string | null;
	settings?: Record<string, any>;
}

export interface RuntimeCodeExample extends CodeExample {
	evalInContext(a: string): () => any;
}

export interface ExampleError {
	type: 'error';
	content: string;
}

export type Example = RuntimeCodeExample | MarkdownExample | ExampleError;
