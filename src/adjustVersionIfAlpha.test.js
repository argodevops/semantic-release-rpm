import adjustVersionIfAlpha from './adjustVersionIfAlpha';

describe('index', () => {
    test('should ignore semantic release version', async () => {
        expect('0.0.1').toEqual(adjustVersionIfAlpha('0.0.1'));
    });

    test('should adjust semantic release version if alpha', async () => {
        expect('0.0.4_alpha.1').toEqual(adjustVersionIfAlpha('0.0.4-alpha.1'));
    });
});
