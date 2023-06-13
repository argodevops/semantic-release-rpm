import { execSync } from 'child_process';

// Create rpm

export default (buildDir, repository) => {
    process.chdir(`${buildDir}`);
    const output = execSync(
        `rpmbuild --define "_topdir $(pwd)" -bb ./SPECS/${repository}.spec`
    ).toString();
    /* eslint-disable no-console */
    console.log(output);
    process.chdir('../');
};
