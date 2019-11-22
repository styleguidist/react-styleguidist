interface RsgMarkdownExample {
	type: 'markdown';
	content: string;
	settings?: Record<string, any>;
}

interface RsgCodeExample {
	evalInContext(a: string): () => any;
	type: 'code';
	content: string;
	settings?: Record<string, any>;
}

type RsgExample = RsgCodeExample | RsgMarkdownExample;
