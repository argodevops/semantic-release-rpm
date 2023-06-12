# Semantic-release-rpm
`semantic-release-rpm` is a plugin for semantic release that will build and publish a rpm.

## Usage

``` js
// release.config.js OR .releaserc.json

{
    plugins: [
        '@argodevops/semantic-release-rpm', {
            packageName: 'package_one',
            envKey: 'NOTIFY_URLS'
        }
    ]
}
```

## Config
- envKey
    - type: `string`
    - default: NOTIFY_TEAMS_LIST
    - The environment variable used to store the comma seperated list of urls to notify
- packageName
    - type: `string`
    - The name of the package to be used in notification messages