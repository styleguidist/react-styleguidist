declare module 'is-directory' {
    const isDirectory: {
        (pathToCheck: string, callback: (isDir: boolean) => void): void;
        sync(pathToCheck: string): boolean;
    };
    export = isDirectory;
}
