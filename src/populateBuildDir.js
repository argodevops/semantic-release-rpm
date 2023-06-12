import { execSync } from 'child_process';

export default (buildDir, repository, version) => {
    execSync(
        `pwd; rsync -av --progress --exclude="${buildDir}" --exclude="node_modules" * ./rpmbuild/BUILD/${repository}-${version}/. >/dev/null`
    );
};
