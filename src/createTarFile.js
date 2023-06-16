import { execSync } from 'child_process';

// Compress files into tar.gz archive

export default (buildDir, repository, version) => {
    process.chdir(`${buildDir}/BUILD`);
    execSync(
        `tar -czvf ../SOURCES/${repository}-${version}.tar.gz ./${repository}-${version}/ >/dev/null`
    );
    process.chdir('../../');
};
