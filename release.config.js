/* eslint-disable no-template-curly-in-string */
const pkg = require('./package.json');

const branches = [
    'main',
    {
        name: 'alpha',
        prerelease: true
    }
];

const commitAnalyzer = '@semantic-release/commit-analyzer';
const releaseNotesGenerator = '@semantic-release/release-notes-generator';
const changelog = '@semantic-release/changelog';
const npm = '@semantic-release/npm';

const deprecate = [
    'semantic-release-npm-deprecate',
    {
        deprecations: [
            {
                version: "< ${nextRelease.version.split('.')[0]}",
                message: "Please use ^${nextRelease.version.split('.')[0]}.0.0."
            }
        ]
    }
];

const git = '@semantic-release/git';

module.exports = {
    branches,
    plugins: [
        commitAnalyzer,
        releaseNotesGenerator,
        changelog,
        npm,
        deprecate,
        git
    ]
};
