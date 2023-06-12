import { mkdirSync } from 'fs';

export default (buildDir, repository, version) => {
    mkdirSync(buildDir);
    mkdirSync(`${buildDir}/BUILD`);
    mkdirSync(`${buildDir}/BUILD/${repository}-${version}`);
    mkdirSync(`${buildDir}/RPMS`);
    mkdirSync(`${buildDir}/SOURCES`);
    mkdirSync(`${buildDir}/SPRMS`);
    mkdirSync(`${buildDir}/SPECS`);
};
