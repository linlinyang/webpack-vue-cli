//babel 配置文件

module.exports = api => {
    api.cache(true); // 缓存这个配置文件，不用每次编译都导入

    const presets = [
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'usage', // 按需引入babel-polyfill
                'modules': false,
                'corejs': 3 // 安装corejs3一定要指定版本，不然会找不到目录报错
            }
        ]
    ];

    const plugins = [
        [
            'component',//按需加载element-ui
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