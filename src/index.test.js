import fs from 'fs';

import removeBuildDir from './removeBuildDir';

import { prepare, publish } from './index';

// const mockExecSync = jest.fn();
jest.mock('./copyRpmToS3');

describe('index', () => {
    beforeEach(() => {
        const buildDir = './rpmbuild';
        removeBuildDir(buildDir);
        jest.resetAllMocks();
    });
    test('should create a rpm', async () => {
        const context = {
            nextRelease: {
                version: '0.0.3-alpha.1'
            }
        };

        const pluginConfig = {
            packageName: 'semantic-release-rpm-test',
            installationDir: '/opt/semantic-release-rpm-test'
        };
        prepare(pluginConfig, context);

        const files = fs
            .readdirSync('./rpmbuild/RPMS/x86_64')
            .filter(
                fn =>
                    fn.startsWith('semantic-release-rpm-test-0.0.3_alpha.1') &&
                    fn.endsWith('.rpm')
            )
            .toString();
        const filePath = `./rpmbuild/RPMS/x86_64/${files}`;

        expect(true).toEqual(
            fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()
        );

        publish(pluginConfig, context);
    });

    test('catch error thrown when no packageName', async () => {
        const context = {
            nextRelease: {
                version: '0.0.3-alpha.1'
            }
        };

        try {
            const pluginConfig = {
                packageName: '',
                installationDir: '/opt/semantic-release-rpm-test'
            };

            prepare(pluginConfig, context);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toEqual(
                "You don't have a pluginConfig, packageName set."
            );
        }
    });

    test('catch error thrown when no installationDir', async () => {
        const context = {
            nextRelease: {
                version: '0.0.3-alpha.1'
            }
        };

        try {
            const pluginConfig = {
                packageName: 'semantic-release-rpm-test',
                installationDir: ''
            };

            prepare(pluginConfig, context);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toEqual(
                "You don't have a pluginConfig, installationDir set."
            );
        }
    });
});
