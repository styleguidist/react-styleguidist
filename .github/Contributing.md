# How to contribute

I love pull requests. And following this guidelines will make your pull request easier to merge.

If you want to contribute but don’t know what to do (we need you!): we have two labels in issue for you: [pull request welcome](https://github.com/styleguidist/react-styleguidist/issues?q=is%3Aissue+is%3Aopen+label%3A%22pull+request+welcome%22) and [easy task](https://github.com/styleguidist/react-styleguidist/issues?q=is%3Aissue+is%3Aopen+label%3A%22easy+task%22). Our [docs](https://github.com/styleguidist/react-styleguidist/tree/master/docs) and [site](https://github.com/styleguidist/site) are far from perfect too and would like to get some love.

## Prerequisites

- If it’s your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Install [EditorConfig](http://editorconfig.org/) plugin for your code editor to make sure it uses the correct indentation.
- Fork the repository and clone your fork.
- Install dependencies: `npm install`.
- Read the [developer guide](https://react-styleguidist.js.org/docs/development.html).

## Development workflow

Run Babel in watch mode and start example style guide:

```bash
npm run compile:watch & npm start
```

Open [localhost:6060](http://localhost:6060) in a browser.

(There are other example style guides to test particular features too, run `npm run` to see a list.)

Run linters and tests:

```bash
npm test
```

Or run tests in watch mode:

```bash
npm run test:watch
```

To update the Jest snapshots:

```bash
npm run test:jest -- -u
```

**Don’t forget to add tests and update documentation for your changes.**

**Please update npm lock file (`package-lock.json`) if you add new dependencies.**

## Other notes

- If you have commit access to repository and want to make big change or not sure about something, make a new branch and open pull request.
- We’re using [Prettier](https://github.com/prettier/prettier) to format JavaScript, so don’t worry much about code formatting.
- Don’t commit generated files: compiled from Stylus CSS, minified JavaScript, etc.
- Don’t change version number and change log.

## Need help?

- Join our [Gitter chat](https://gitter.im/styleguidist/styleguidist) and ask everything you need.
