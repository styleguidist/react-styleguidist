declare module 'github-slugger' {
    class Slugger {
        reset(): void;
        slug(input: string): string;
    }
    export = Slugger;
}
