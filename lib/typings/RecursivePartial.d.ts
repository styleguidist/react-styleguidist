/**
 * In a custom config file you might only want to override some parameters
 * This is the usage of the recursive Partial
 * `interface Test{param:string, paramObject:{p1:number, p2:boolean}}`
 * becomes
 * `interface TestPartial{param?:string, paramObject?:{p1?:number, p2?:boolean}}`
 * where everything is optional
 */
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends (...args: unknown[]) => unknown ? T[P] : T[P] extends Record<string, unknown> ? RecursivePartial<T[P]> : T[P];
};
