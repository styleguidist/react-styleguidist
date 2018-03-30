// eslint-disable-next-line import/no-unresolved, import/extensions
import { danger, warn } from 'danger';

const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('package-lock.json');

if (packageChanged && !lockfileChanged) {
	warn(`Changes were made to \`package.json\`, but not to \`package-lock.json\`.

Perhaps you need to run \`npm install\` and commit changes in package-lock.json. Make sure you’re using npm 5+.`);
}

if (!packageChanged && lockfileChanged) {
	warn(`Changes were made to \`package-lock.json\`, but not to \`package.json\`.

Please remove \`package-lock.json\` changes from your pull request. Try to run \`git checkout master -- package-lock.json\` and commit changes.`);
}
