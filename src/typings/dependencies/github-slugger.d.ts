declare module 'github-slugger' {
	class Slugger {
		static reset(): void;
		slug(input: string): string;
	}
	export = Slugger;
}
