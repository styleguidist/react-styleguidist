<!-- CLI commands #cli -->

# CLI commands and options

## Commands

- `styleguidist server`: Run dev server.
- `styleguidist build`: Generate a static HTML style guide.

## Options

| Option            | Description                                   |
| ----------------- | --------------------------------------------- |
| `--config <file>` | Specify path to a config file                 |
| `--port <port>`   | Specify port to run the development server on |
| `--open`          | Open Styleguidist in the default browser      |
| `--verbose`       | Print debug information                       |

## Usage

Add these commands into your `package.json`’s `scripts` section:

```json
{
  "scripts": {
    "styleguide": "styleguidist server",
    "styleguide:build": "styleguidist build"
  }
}
```

Or run them directly from your terminal:

```bash
npx styleguidist server
npx styleguidist build
```

> **Tip:** [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a part of npm and will run locally-installed `styleguidist` package.
