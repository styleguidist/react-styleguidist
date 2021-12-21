declare module 'listify' {
    interface ListifyOptions {
        finalWord: string;
    }
    function listify(list: any[], opt?: ListifyOptions): string;
    export = listify;
}
