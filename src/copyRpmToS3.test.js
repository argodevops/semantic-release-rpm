/* eslint-disable camelcase */
import child_process from 'child_process';
import { closeSync, mkdirSync, openSync } from 'fs';

import copyRpmToS3 from './copyRpmToS3';
import createBuildDir from './createBuildDir';
import removeBuildDir from './removeBuildDir';

let cpExecSpy;

describe('index', () => {
    beforeEach(() => {
        const buildDir = './rpmbuild';
        removeBuildDir(buildDir);
        cpExecSpy = jest
            .spyOn(child_process, 'execSync')
            .mockImplementation(jest.fn());
    });

    test('should copy a rpm', async () => {
        const buildDir = './rpmbuild';
        createBuildDir(buildDir, 'repository', 'version');
        mkdirSync(`${buildDir}/RPMS/x86_64`);
        const filePath = `${buildDir}/RPMS/x86_64/semantic-release-rpm-test-0.0.3_alpha.1.rpm`;
        closeSync(openSync(filePath, 'w'));
        const filePath2 = `${buildDir}/RPMS/x86_64/semantic-release-rpm-test-0.0.3_alpha.1.xsx`;
        closeSync(openSync(filePath2, 'w'));

        copyRpmToS3('./rpmbuild', '0.0.3_alpha.1');
        expect(cpExecSpy).toBeCalledTimes(1);
    });
});
