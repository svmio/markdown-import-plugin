import * as deepmerge from "deepmerge";
import MarkdownIt = require("markdown-it");
import {Compiler, RuleSetRule, RuleSetUse} from "webpack";
import {DynamicModulePlugin} from '@svmio/dynamic-module-plugin'
import {initParser} from "./util";
import {setLoaderOption} from "./loader";

interface MarkdownImportPluginOptions {
  test: RegExp,
  exportType?: 'vue' | 'react',
  liveFence?: string,
  liveWrap?: string,
  className?: string,
  processLoader?: RuleSetUse,
  parserOption?: MarkdownIt.Options,
}

const defaultOption: MarkdownImportPluginOptions = {
  test: /\.md$/i,
  exportType: 'react',
  className: 'markdown-body',
  parserOption: {
    html: true,
    xhtmlOut: true,
    typographer: true,
    breaks: true,
    linkify: true,
    langPrefix: 'language-'
  }
};


class MarkdownImportPlugin {

  option: MarkdownImportPluginOptions

  constructor(opts?: MarkdownImportPluginOptions) {
    this.option = deepmerge<MarkdownImportPluginOptions>(defaultOption, opts || {})
  }

  apply(compiler: Compiler) {

    compiler.options.plugins.push(new DynamicModulePlugin())

    setLoaderOption({
      className: this.option.className,
      exportType: this.option.exportType,
      liveFence: this.option.liveFence,
      liveWrap: this.option.liveWrap,
    });

    initParser(this.option.parserOption)

    const rawRules = compiler.options.module?.rules || [];
    let {processLoader} = this.option
    const babelLoaderOptions = getBabelLoaderOptions(rawRules as any as RuleSetRule[])

    processLoader = processLoader || babelLoaderOptions ? {
      loader: 'babel-loader',
      options: babelLoaderOptions
    } : 'babel-loader'

    const docRule: RuleSetRule = {
      test: this.option.test,
      use: [processLoader, require.resolve('./loader')]
    }

    compiler.options.module!.rules = [
      ...rawRules,
      docRule
    ]

  }
}

function getBabelLoaderOptions(rules: RuleSetRule[]){
  for (const rule of rules){
    if (rule.loader === 'babel-loader') {
      return rule.options;
    } else {
      const useItems = Array.isArray(rule.use) ? rule.use : [rule.use]
      for (const useItem of useItems) {
        if (typeof useItem === 'object' &&  useItem.loader === 'babel-loader') {
          return (useItem as RuleSetRule).options;
        }
      }
    }
  }
}

export = MarkdownImportPlugin
