# Migration guide

## 11 to 12

### Remove or update `compilerConfig` config option

Since Styleguidist is using [Sucrase](https://github.com/alangpierce/sucrase/) instead of [Bublé](https://buble.surge.sh/guide/) to compile examples’s code by default and allows you to chanage the compiler, the `compilerConfig` config option has been replaced with [`compilerModule`](Configuration.md#compilermodule) and [`compileExample`](Configuration.md#compileexample) options.

Likely, you could remove the `compilerConfig` option.

Otherwise, you could also keep using Bublé by installing `buble` as a dependency, and specifying the `compilerModule` option:

```javascript
module.exports = {
  compilerModule: 'buble',
  compileExample: (compiler, code) =>
    compiler.transform(code, {
      /* Bublé options */
    }).code
}
```

Check docs for [`compilerModule`](Configuration.md#compilermodule) and [`compileExample`](Configuration.md#compileexample) options for more details.
