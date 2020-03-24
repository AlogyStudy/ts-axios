# ts-axios
ts 实现 axios

# TypeScript library starter

TS开发基础库的脚手架

```
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios
npm install
```
> 优秀工具集成

使用 [RollupJS](https://rollupjs.org/guide/en/) 帮助打包。

使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 帮助格式化代码以及保证代码风格一致性。

使用 [TypeDoc](https://typedoc.org/) 帮助自动生成文档并部署到 GitHub pages。

使用 [Jest](https://jestjs.io/) 帮助做单元测试。

使用 [Commitizen](https://github.com/commitizen/cz-cli) 帮助生成规范化的提交注释。

使用 [Semantic release](https://github.com/semantic-release/semantic-release )帮助管理版本和发布。

使用 [husky](https://github.com/typicode/husky) 帮助更简单地使用 git hooks。

使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog) 帮助通过代码提交信息自动生成 change log。

`git remote -v`查看是否有关联
`git remote add origin url` 关联远程库

所需要额外模块
```
npm install webpack webpack-dev-middleware webpack-hot-middleware ts-loader tslint-loader express body-parser --save-dev
```

commit:
```
git add .
npm run commit
```

`ts-axios`基础功能实现
- xhr 主题逻辑
- 处理请求body数据
- 处理请求headers
- 获取响应
- 处理响应headers
- 处理响应 data

`ts-axios`异常情况处理
- 错误处理
    网络异常错误
    超时错误
    非200状态码
- 错误信息增强
    创建AxiosError类
    createError方法应用
    导出类型定义

