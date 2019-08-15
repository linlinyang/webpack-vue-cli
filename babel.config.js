//babel 配置文件

module.exports = api => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'usage',
                'modules': false,
                'corejs': 3
            }
        ]
    ];

    const plugins = [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}