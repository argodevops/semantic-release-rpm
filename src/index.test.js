import fs from 'fs';

import removeBuildDir from './removeBuildDir';

import { prepare } from './index';

describe('index', () => {
    beforeEach(() => {
        const buildDir = './rpmbuild';
        removeBuildDir(buildDir);
    });
    test('should create a rpm', async () => {
        // global.console.log = jest.fn();
        expect.assertions(1);

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

        // console.log(`\n\nFILES = ${files.toString()}\n\n`);
        // console.log(`\n\ntypeof FILES = ${typeof files}\n\n`);
        // console.log(`\n\nFILEPATH = ${filePath}\n\n`);

        // console.log(`existsSync = ${fs.existsSync(filePath)}\n\n`);
        // console.log(`lstatSync = ${fs.lstatSync(filePath).isFile()}\n\n`);

        // const filePath =
        //     './rpmbuild/RPMS/x86_64/semantic-release-rpm-test-0.0.3_alpha.1-1.*x86_64.rpm';
        expect(true).toEqual(
            fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()
        );
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
