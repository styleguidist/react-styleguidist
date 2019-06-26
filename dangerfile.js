// eslint-disable-next-line import/no-unresolved, import/extensions
import { danger, warn } from 'danger';

// check if the main package.json has been changed
const packageChanged = danger.git.modified_files.includes('package.json');

//gather all changes made to each sub package in the monorepo
const packagesChanged = danger.git.modified_files.reduce(
	(result, file) => result || /packages\/[^/]+\/package\.json/.test(file),
	packageChanged
);
const lockfileChanged = danger.git.modified_files.includes('yarn.lock');

if (packagesChanged && !lockfileChanged) {
	warn(`Changes were made to one or more \`package.json\`, but not to \`yarn.lock\`.

If you’ve changed any dependencies (added, removed or updated any packages), please run \`yarn install\` and commit changes in yarn.lock file.`);
}

if (!packagesChanged && lockfileChanged) {
	warn(`Changes were made to \`yarn.lock\`, but not to any \`package.json\`.

Please remove \`yarn.lock\` changes from your pull request. Try to run \`git checkout master -- yarn.lock\` and commit changes.`);
}
