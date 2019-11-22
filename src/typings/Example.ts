export interface MarkdownExample {
	type: 'markdown';
	content: string;
	settings?: Record<string, any>;
}

export interface CodeExample {
	evalInContext(a: string): () => any;
	type: 'code';
	content: string;
	settings?: Record<string, any>;
}

export type Example = CodeExample | MarkdownExample;
