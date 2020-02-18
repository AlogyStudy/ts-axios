
let fs = require('fs')
let path = require('path')
let webpack = require('webpack')

module.exports = {
    mode: 'development',

    /**
     * examples 目录下创建多个子目录
     * 把不同的demo放到子目录中
     * app.ts 作为 webpack构建的入口文件
     * entires 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
     * entires 是一个对象，key 为目录名
     */
    entry: fs.readFileSyns(__dirname).reduce((entires, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.ts')
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entires[dir] = ['webpack-hot-middleware/client', entry]
        }
        return entires
    }, {}),

    /**
     * 根据不同的目录名称，打波啊生产目标的js，名称和目录名一致
     */
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },

    module: {
        rules: [
            {
                test: '/\.ts$/',
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: '/\.tsx?$/',
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 模块热替换
        new webpack.NoEmitOnErrorsPlugin() // 编译输出
    ]
}