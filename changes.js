const { execSync } = require('child_process');
const path = require('path');

// Get the changed services using git diff
function getChangedServices() {
	const beforeSha =
		process.argv[2] || process.env.CI_COMMIT_BEFORE_SHA || '"HEAD~1"';

	const afterSha = process.argv[3] || process.env.CI_COMMIT_SHA || 'HEAD';
	const diffCommand = `git diff --name-only ${beforeSha} ${afterSha}`;

	const output = execSync(diffCommand, {
		cwd: process.cwd(),
		encoding: 'utf8'
	});

	const changedServices = new Set();

	output.split('\n').forEach((filePath) => {
		const match = filePath.match(/^services\/([^\/]+)/);
		if (match) {
			changedServices.add(match[1]);
		}
	});

	return Array.from(changedServices);
}

function main() {
	try {
		const changedServices = getChangedServices();
		console.log(changedServices.join(','));
		process.exit(0);
	} catch (e) {
		process.exit(1);
	}
}

main();
