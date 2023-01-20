<!-- Maintainer guide #maintenance -->

# Maintainer guide

_See also [Developer guide](Development.md)._

## We need you!

Help us develop and maintain Styleguidist:

- Answer questions in [GitHub issues](https://github.com/styleguidist/react-styleguidist/issues) and [Stack Overflow](https://stackoverflow.com/questions/tagged/react-styleguidist).
- Review [pull requests](https://github.com/styleguidist/react-styleguidist/pulls).
- Fix bugs and add new features.
- Write articles and talk about Styleguidist on conferences and meetups (we’re always happy to review your texts and slides).

## Commit message conventions

We use a simplified [Angular commit message conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit). This makes automated releases with [semantic-release](https://github.com/semantic-release/semantic-release) possible.

\*\*The main differences with the Angular convention is that all messages are capitalized. Commit messages are written for humans to read, so we should use text convention for humans, not for machines.

Hovewer, we commit messages should follow a ceratain structure, so they semantic-release could generate nice human-readalbe changelogs.

**The commit message** consists of a `header`, a `body`, and a `footer`:

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the commit message header format described below.

The `body` optional but higly recommended for most commits, except very simple ones.

The `footer` is optional.

**The commit message header** looks like this:

```
<type>: <Short summary>
  │       │
  │       └─⫸ Summary in present tense. Capitalized. No period at the end.
  │
  └─⫸ Commit type: chore|docs|feat|fix|refactor|test
```

The `<type>` and `<Short summary>` fields are mandatory.

### Type

Must be one of the following:

- `chore` — configuration change, dependencies upgrade, and so on.
- `docs` — changes to documentation only.
- `feat` — a new feature.
- `fix` — a bug fix.
- `refactor` — a code change that neither fixes a bug nor adds a feature.
- `test` — adding missing tests or correcting existing tests.

### Short summary

Use the summary field to provide a short description of the change.

- use the imperative, present tense: “change” not “changed” nor “changes”;
- always capitalize the first letter;
- no dot (.) at the end.

### Commit message body

As in the summary, use the imperative, present tense: “fix” not “fixed” nor “fixes”, but put a dot (.) at the end of each sentence.

Explain the motivation for the change: why you are making it. You could include a comparison of the previous behavior with the new behavior to illustrate the impact of the change.

### Commit message footer

The footer could contain information about breaking changes, and is also the place to reference GitHub issues, and other pull requests that this commit closes or is related to.

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

Breaking change section should start with the phrase `BREAKING CHANGE:` (with a `:` and a space at the end, you must use ALL CAPS — _sorry but life is full of pain_) followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

If the commit doesn’t completely fix the issue, then use (`Refs #1234`) instead of (`Fixes #1234`).

### Commit messsage example

````
Fix: Fix missing FlowType enum values in prop description

In ef4c109b, the file `PropsRenderer.js` (located at
`src/client/rsg-components/Props/PropsRenderer.js`) was removed. In
`PropsRenderer.js`, the `renderExtra` method checked whether `getType`
for the argument to `renderExtra` was present:

```es6
function renderExtra(prop) {
  const type = getType(prop);
  if (!type) {
    return null;
  }
  ...
}
```

However, in ef4c109b, this method was replaced with `renderExtra.tsx`
and the condition was changed to:

```typescript
export default function renderExtra(prop: PropDescriptorWithFlow): React.ReactNode {
  const type = getType(prop);
  if (!prop.type || !type) {
    return null;
  }
```

Unfortunately, this extra condition has resulted in this method always returning `null` for a Flow typed prop as `prop.type` is always `null` as `prop.type` is never set.

This commit reverts the condition to what it was before the migration to TypeScript.

Fixes #1234

````

## Pull requests

Maintainers merge pull requests by squashing all commits and editing the commit message if necessary using the GitHub user interface.

Use an appropriate commit type. Be especially careful with breaking changes. See _Commit message conventions_ above for details.

## Releases

We’re doing automated releases with semantic-release. We’re using [milestones](https://github.com/styleguidist/react-styleguidist/milestones) to group approved pull requests that should be released together (most useful for major releases).

### Patch releases

Any commit of a `fix` type merged into the master branch, is published as a _patch_ release as soon as CI passes.

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1T3v1z0c3f1I1E3l0B3s/patch-commit.png)

### Minor releases

Any commit of a `feat` type merged into the master branch, is published as a _minor_ release as soon as CI passes.

### Major releases

Any commit of a `feat` type with a breaking change section merged into the master branch, is published as a _major_ release as soon as CI passes.

1. Merge all pull requests from a milestone. If a milestone has more than one pull request, they should be merged and released together:
   1. Create a new branch.
   2. Merge all pull requests into this new branch (you can change the target branch on the pull request page and merge it using the GitHub user interface).
   3. Resolve possible merge conflicts.
2. Wait until semantic-release publishes the release.
3. Edit the release notes on GitHub (see _Changelogs_ below).
4. Tweet the release!

## Changelogs

### What is a good changelog

- Changelogs are written for users, not developers.
- Changelog should show new features with code examples or GIFs.
- Changelog should make all breaking changes clear.
- Changelog should explain how to migrate to a new version if there are breaking changes.
- Commit log **is not** a changelog but can be a base for it.

Here’s a [good example of a changelog](https://github.com/styleguidist/react-styleguidist/releases/tag/v7.1.0). Check out [Keep a Changelog](https://keepachangelog.com/) for more details on good changelogs.

### What should be in a changelog

- Information about pull request authors:<br> `(#1040 by @rafaesc)`
- Open Collective link at the very top:<br> `👋 **[Support Styleguidist](https://opencollective.com/styleguidist) on Open Collective** 👋`

