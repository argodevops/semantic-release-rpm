import { rmSync, statSync } from 'fs';

export default buildDir => {
    const buildDirStat = statSync(buildDir, { throwIfNoEntry: false });
    if (buildDirStat !== undefined) {
        rmSync(buildDir, { recursive: true, force: true });
    }
};
