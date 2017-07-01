import { danger, warn } from 'danger';

const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
if (packageChanged && !lockfileChanged) {
	warn(`Changes were made to package.json, but not to package-lock.json.

Perhaps you need to run \`rm package-lock.json && npm install\`. Make sure you’re using npm 5+.`);
}
