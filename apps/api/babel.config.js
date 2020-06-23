module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", {"targets": {"node": "12"} }]
    ];

    return {
        exclude: [],
        ignore: [/node_modules\/(?!\@ci-user-module|\@ci-custom-module)/],
        presets,
    };
};