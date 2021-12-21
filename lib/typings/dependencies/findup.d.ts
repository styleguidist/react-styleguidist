declare module 'findup' {
    const findup: {
        sync(cwd: string, path: string): string;
    };
    export = findup;
}
