import { execSync } from 'child_process';

// Create rpm

export default (buildDir, repository) => {
    process.chdir(`${buildDir}`);
    execSync(
        `rpmbuild --define "_topdir $(pwd)" -bb ./SPECS/${repository}.spec`
    ).toString();
    process.chdir('../');
};
