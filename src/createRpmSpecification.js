import fs from 'fs';
import path from 'path';

export default (buildDir, repository, version, installationDir) => {
    const specPath = path.join(buildDir, '/SPECS', `${repository}.spec`);
    fs.appendFileSync(specPath, `Name:           ${repository}\n`);
    fs.appendFileSync(specPath, `Version:        ${version}\n`);
    fs.appendFileSync(specPath, 'Release:        1%{?dist} \n');
    fs.appendFileSync(
        specPath,
        `Summary:        The ${repository} rpm artifact \n`
    );
    fs.appendFileSync(specPath, 'BuildArch:      x86_64\n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, 'License:        GPL\n');
    fs.appendFileSync(specPath, 'Source0:        %{name}-%{version}.tar.gz \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, 'Requires:       bash \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%description \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%prep \n');
    fs.appendFileSync(specPath, '%setup -q \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%build \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%install \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, 'rm -rf %{buildroot} \n');
    fs.appendFileSync(specPath, 'mkdir -p %{buildroot} \n');
    fs.appendFileSync(
        specPath,
        'cp %{SOURCE0} %{buildroot}/%{name}-%{version}.tar.gz \n'
    );
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%post \n');
    fs.appendFileSync(specPath, '# Extract the tarball \n');
    fs.appendFileSync(specPath, `mkdir -p ${installationDir} \n`);
    fs.appendFileSync(
        specPath,
        `tar -xzf /%{name}-%{version}.tar.gz -C ${installationDir} \n`
    );
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%files \n');
    fs.appendFileSync(
        specPath,
        '# Include the source file in the final RPM \n'
    );
    fs.appendFileSync(specPath, '/%{name}-%{version}.tar.gz \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%doc \n');
    fs.appendFileSync(specPath, '\n');
    fs.appendFileSync(specPath, '%changelog \n');
};
