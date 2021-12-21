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
export declare type Example = RuntimeCodeExample | MarkdownExample;
