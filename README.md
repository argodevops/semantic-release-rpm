# Semantic-release-rpm
`semantic-release-rpm` is a plugin for semantic release that will build and publish a rpm.

## Usage

``` js
// release.config.js OR .releaserc.json

{
    plugins: [
        '@argodevops/semantic-release-rpm', {
            packageName: 'package_name',
            installationDir: '/opt/my-deployment'
        }
    ]
}
```

## Config
- installationDir
    - type: `string`
    - The directory used to install the rpm.
- packageName
    - type: `string`
    - The name of the package to be used.
