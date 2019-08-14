//babel 配置文件

//core-js建议装：npm install core-js@2 --save;3.0+的版本使用'useBuiltIns': 'usage'有问题
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