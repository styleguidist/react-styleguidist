// eslint-disable-next-line import/no-unresolved, import/extensions
import { danger, warn } from 'danger';

const packageChanged = danger.git.modified_files.includes('package.json');
const packagesChanged =
	packageChanged || danger.git.modified_files.includes('packages/react-styleguidist/package.json');
const lockfileChanged = danger.git.modified_files.includes('yarn.lock');

if (packagesChanged && !lockfileChanged) {
	warn(`Changes were made to \`package.json\`, but not to \`yarn.lock\`.

If you’ve changed any dependencies (added, removed or updated any packages), please run \`npm install\` and commit changes in package-lock.json file. Make sure you’re using npm 5+.`);
}

if (!packagesChanged && lockfileChanged) {
	warn(`Changes were made to \`yarn.lock\`, but not to \`package.json\`.

Please remove \`yarn.lock\` changes from your pull request. Try to run \`git checkout master -- package-lock.json\` and commit changes.`);
}
