/* eslint-disable import/prefer-default-export */
import SemanticReleaseError from '@semantic-release/error';

import adjustVersionIfAlpha from './adjustVersionIfAlpha';
import copyRpmToS3 from './copyRpmToS3';
import createBuildDir from './createBuildDir';
import createRpm from './createRpm';
import createRpmSpecification from './createRpmSpecification';
import createTarFile from './createTarFile';
import populateBuildDir from './populateBuildDir';
import removeBuildDir from './removeBuildDir';

const checkConfig = (configEntry, value) => {
    if (typeof value === 'string' && value.trim().length === 0) {
        throw new SemanticReleaseError(
            `You don't have a pluginConfig, ${configEntry} set.`
        );
    }
};

const buildDir = './rpmbuild';

export const prepare = (pluginConfig, context) => {
    const repository = pluginConfig?.packageName;
    const installationDir = pluginConfig?.installationDir;
    const { nextRelease } = context;

    checkConfig('packageName', repository);
    checkConfig('installationDir', installationDir);

    const version = adjustVersionIfAlpha(nextRelease.version);

    removeBuildDir(buildDir);

    createBuildDir(buildDir, repository, version);

    populateBuildDir(buildDir, repository, version);

    createTarFile(buildDir, repository, version);

    createRpmSpecification(buildDir, repository, version, installationDir);

    createRpm(buildDir, repository);
};

export const publish = (pluginConfig, context) => {
    // const repository = pluginConfig?.packageName;
    // const installationDir = pluginConfig?.installationDir;
    const { nextRelease } = context;
    const version = adjustVersionIfAlpha(nextRelease.version);

    copyRpmToS3(buildDir, version);
};
