# Migration guide

## 11 to 12

### Remove or update `compilerConfig` config option

Since Styleguidist is using [Sucrase](https://github.com/alangpierce/sucrase/) instead of [Bublé](https://buble.surge.sh/guide/) to compile examples’s code, `compilerConfig` config option must be a valid [Sucrase config](https://github.com/alangpierce/sucrase/#transforms). Likely, you could remove this option entirely.

You could also keep using Bublé by installing `buble` as a dependency, and specifying the `compiler` option:

```javascript
module.exports = {
  compiler: 'buble',
  compilerConfig: {
    /* ... */
  }
}
```

Check docs for [`compiler`](Configuration.md#compiler) and [`compilerConfig`](Configuration.md#compilerconfig) options for more details.
