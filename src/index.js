/* eslint-disable import/prefer-default-export */
import SemanticReleaseError from '@semantic-release/error';

import adjustVersionIfAlpha from './adjustVersionIfAlpha';
import createBuildDir from './createBuildDir';
import createRpm from './createRpm';
import createRpmSpecification from './createRpmSpecification';
import createTarFile from './createTarFile';
import populateBuildDir from './populateBuildDir';
import removeBuildDir from './removeBuildDir';

export const prepare = (pluginConfig, context) => {
    const repository = pluginConfig?.packageName;
    const installationDir = pluginConfig?.installationDir;
    const { nextRelease } = context;

    if (typeof repository === 'string' && repository.trim().length === 0) {
        throw new SemanticReleaseError(
            "You don't have a pluginConfig, packageName set."
        );
    }

    if (
        typeof installationDir === 'string' &&
        installationDir.trim().length === 0
    ) {
        throw new SemanticReleaseError(
            "You don't have a pluginConfig, installationDir set."
        );
    }

    const version = adjustVersionIfAlpha(nextRelease.version);

    const buildDir = './rpmbuild';

    removeBuildDir(buildDir);

    createBuildDir(buildDir, repository, version);

    populateBuildDir(buildDir, repository, version);

    createTarFile(buildDir, repository, version);

    createRpmSpecification(buildDir, repository, version, installationDir);

    createRpm(buildDir, repository);
};

// prepare(
//     { packageName: 'semantic-release-rpm', installationDir: '/opt/testrpm' },
//     { nextRelease: { version: '0.0.1-alpha.2' } }
// );
