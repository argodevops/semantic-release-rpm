import { execSync } from 'child_process';
import { readdirSync } from 'fs';

export default (buildDir, repository, version) => {
    process.chdir(`${buildDir}/RPMS/x86_64`);
    const rpmName = readdirSync('.')
        .filter(
            fn =>
                fn.startsWith(`${repository}-${version}`) && fn.endsWith('.rpm')
        )
        .toString();

    execSync(
        `aws s3 cp ${rpmName} s3://rpm-deployment-storage-valley/valley-deployment/${version}/${rpmName}`
    );
};
