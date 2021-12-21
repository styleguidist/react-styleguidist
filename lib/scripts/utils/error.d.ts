declare class StyleguidistError extends Error {
    extra: any;
    constructor(message: string, extra?: any);
}
export default StyleguidistError;
