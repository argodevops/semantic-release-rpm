import { execSync } from 'child_process';

import SemanticReleaseError from '@semantic-release/error';

// Create rpm

export default (buildDir, repository) => {
    try {
        process.chdir(`${buildDir}`);
        execSync(
            `rpmbuild --define "_topdir $(pwd)" -bb ./SPECS/${repository}.spec`
        ).toString();
    } catch (error) {
        throw new SemanticReleaseError(`Unable to change dir to ${buildDir}.`);
    }
    process.chdir('../');
};
