export interface Example {
	type: 'code' | 'text';
	lang: string;
	content: string;
	settings: { [key: string]: string };
}
