# Maintainer guide

<!-- To update run: npx markdown-toc -i docs/Maintenance.md -->

<!-- toc -->

- [We need you!](#we-need-you)
- [Commit message conventions](#commit-message-conventions)
- [Pull requests](#pull-requests)
- [Releases](#releases)
  - [Patch releases](#patch-releases)
  - [Minor and major releases](#minor-and-major-releases)
- [Change logs](#change-logs)
  - [What is a good change log](#what-is-a-good-change-log)
  - [Preparing a change log](#preparing-a-change-log)

<!-- tocstop -->

_See also [Developer guide](Development.md)._

## We need you!

Help us develop and maintain Styleguidist:

- Answer questions in [GitHub issues](https://github.com/styleguidist/react-styleguidist/issues) and [Stack Overflow](https://stackoverflow.com/questions/tagged/react-styleguidist).
- Review [pull requests](https://github.com/styleguidist/react-styleguidist/pulls).
- Fix bugs and add new features.
- Write articles and talk about Styleguidist on conferences and meetups (we’re always happy to review your texts and slides).

## Commit message conventions

[Commit message conventions](https://github.com/tamiadev/semantic-release-tamia/blob/master/Convention.md) are based on Angular conventions.

## Pull requests

Maintainers merge pull requests by squashing all commits and editing the commit message if necessary.

Use an [appropriate commit type](https://github.com/tamiadev/semantic-release-tamia/blob/master/Convention.md#types). Be especially careful with [breaking changes](https://github.com/tamiadev/semantic-release-tamia/blob/master/Convention.md#breaking-changes).

## Releases

We’re doing [semi-automated releases](http://blog.sapegin.me/all/semantic-release) with semantic-release.

### Patch releases

Patch releases are fully automated — any commit of a `Fix` type is published as a patch release as soon as CI passes.

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1T3v1z0c3f1I1E3l0B3s/patch-commit.png)

### Minor and major releases

We’re using [milestones](https://github.com/styleguidist/react-styleguidist/milestones) to group approved pull requests that should be released together. Minor and major releases require a change log (see below). Any commit of a `Feat` type will not trigger a release until you commit a change log. Semantic-release will publish a major release, if there are any commits with [breaking changes](https://github.com/tamiadev/semantic-release-tamia/blob/master/Convention.md#breaking-changes).

1.  Merge all pull request from a milestone
2.  Resolve possible merge conflicts.
3.  Manually check that Styleguidist is still works.
4.  Prepare and commit a change log.
5.  Wait until semantic-release publishes the release.
6.  Tweet the release!

## Change logs

### What is a good change log

- Change logs are written for users, not developers.
- Change log should show new features with code examples or GIFs.
- Change log should make all breaking changes clear.
- Change log should explain how to migrate to a new versions if there are breaking changes.
- Commit log **is not** a change log.

Here’s a [good example of a change log](https://github.com/styleguidist/react-styleguidist/releases/tag/v7.1.0). Check out [Keep a Changelog](https://keepachangelog.com/) for more details on good change logs.

### What should be in a change log

* Information about pull request authors:<br>
    `(#1040 by @rafaesc)`
* Open Collective link at the very top:<br>
    `👋 **[Support Styleguidist](https://opencollective.com/styleguidist) on Open Collective** 👋`

### Preparing a change log

1.  Generate a change log draft using [tamia-changelog](https://github.com/tamiadev/tamia-changelog): `npx tamia-changelog`
2.  Edit `Changelog.md` file.
3.  Commit the change log: `npx tamia-changelog commit`.
