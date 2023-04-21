# markdown-import-plugin
A webpack plugin built to treat markdown files as React or Vue modules  
Languages: [English]() | [简体中文](./README_ZH.md)

## API
```
MarkdownImportPluginOptions {
  test: RegExp, // matcher for markdown files
  exportType?: 'vue' | 'react', // target runtime
  liveFence?: string, // tag name for live code in markdown file
  liveWrap?: string, // wrap component for live code
  className?: string, // markdown doc's classname
  processLoader?: RuleSetUse, // loader used to process the exported module,'babel-loader' assigned if absent
  parserOption?: MarkdownIt.Options, // init options for 'markdown-it' instance
}
```

## Getting Started
To begin, you'll need to install markdown-import-plugin:
```bash
npm install -D @svmio/markdown-import-plugin
```
Then add the plugin to your webpack config. For example:

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

Now,you can import any markdown files like below  
**app.js**

```js
import React from 'react';
import Test from './a-markdown-file.md';

export default function App(){
    return (<Test/>)
}

```
