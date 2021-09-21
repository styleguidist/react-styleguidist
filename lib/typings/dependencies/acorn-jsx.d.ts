declare module 'acorn-jsx' {
    import { Parser } from 'acorn';
    function acornJsx(): (BaseParser: typeof Parser) => typeof Parser;
    export = acornJsx;
}
