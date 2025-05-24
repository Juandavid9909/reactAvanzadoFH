module.exports = {
    globDirectory: 'build/',
    globPatterns: [
        '**/*.{ico,png,json,txt}'
    ],
    swDest: 'build/sw.js',
    swSrc: 'src/sw-template.js',
    // ignoreURLParametersMatching: [
    //     /^utm_/,
    //     /^fbclid$/
    // ]
};