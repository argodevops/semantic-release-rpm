import { execSync } from 'child_process';

// Create rpm

export default (buildDir, repository) => {
    execSync(
        `cd ${buildDir}; rpmbuild --define "_topdir $(pwd)" -bb ./SPECS/${repository}.spec >/dev/null`
    );
};
