import fs from 'fs';

import { prepare } from './index';

describe('index', () => {
    test('should create a rpm', async () => {
        global.console.log = jest.fn();
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

        const filePath =
            './rpmbuild/RPMS/x86_64/semantic-release-rpm-test-0.0.3_alpha.1-1.amzn2.x86_64.rpm';
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
