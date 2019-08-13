//babel 配置文件

module.exports = api => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'usage',
                'modules': false
            }
        ]
    ];

    return {
        presets
    };
}