declare module 'deabsdeep' {
    interface Options {
        root?: string;
        mask?: string;
    }
    function deabsdeep<T>(objectToFreze: T, opt?: Options): T;
    export = deabsdeep;
}
