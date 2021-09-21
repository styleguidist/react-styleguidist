declare type Module = DefaultExport | {
    [name: string]: any;
};
interface DefaultExport {
    default: any;
}
/**
 * Given a component module and a name,
 * return the appropriate export.
 * See /docs/Components.md
 */
export default function getComponent(module: Module, name?: string): Module;
export {};
