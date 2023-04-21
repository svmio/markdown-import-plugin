# markdown-import-plugin
一个用来将markdown文件当作React或Vue模块文件来导入的webpack插件  
语言: [English]() | [简体中文](./README_ZH.md)

## API
```
MarkdownImportPluginOptions {
  test: RegExp, // markdown文件名的正则
  exportType?: 'vue' | 'react', // 目标运行时
  liveFence?: string, // markdown文档中需要编译成实时代码的代码标签
  liveWrap?: string, // 包裹实时代码的组件
  className?: string, // 文档导出后的class名
  processLoader?: RuleSetUse, // 前置处理loader,默认babel
  parserOption?: MarkdownIt.Options, // 'markdown-it' 的初始化参数
}
```

## 使用方法
首先，安装 markdown-import-plugin:
```bash
npm install -D @svmio/markdown-import-plugin
```
在webpack配置中添加插件

**webpack.config.js**

```js
const MarkdownImportPlugin = require('@svmio/markdown-import-plugin');
const pluginOption = {
  test: /\.md$/i,
  exportType: 'react',
  liveFence: 'jsx',
}
module.exports = {
  plugins: [
    new DynamicModulePlugin(pluginOption),
  ],
};
```

在你需要的地方可以直接用import导入markdown文件
**app.js**

```js
import React from 'react';
import Test from './a-markdown-file.md';

export default function App(){
  return (<Test/>)
}

```
