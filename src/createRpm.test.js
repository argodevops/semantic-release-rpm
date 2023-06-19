import createRpm from './createRpm';

describe('index', () => {
    test('catch error thrown when no packageName', async () => {
        try {
            createRpm(
                './wrongBuildDir',
                'semantic-release-rpm-test',
                '0.0.3-alpha.1'
            );
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toEqual(
                'Unable to change dir to ./wrongBuildDir.'
            );
        }
    });
});
