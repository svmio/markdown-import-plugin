import {LoaderContext} from "webpack";
import {defineDynamicModule} from '@svmio/dynamic-module-plugin'
import {parser, stringifyRequest} from "./util";

export interface LoaderOption {
  exportType?: string,
  liveFence?: string,
  liveWrap?: string,
  className?: string
}

let options: LoaderOption

export function setLoaderOption(opts: LoaderOption) {
  options = Object.assign({}, opts)
}

export default function loader(this: LoaderContext<LoaderOption>, source: string) {
  const context = this;
  const tokens = parser.parse(source, {});
  let liveImport = [];
  let sourceMap: Record<string, any> = {};
  let seq = -1;
  const {resourcePath, context: baseDir} = context
  for (const token of tokens) {
    if (token.type !== 'fence') {
      continue
    }
    if (token.info === options.liveFence) {
      seq++;
      token.type = Boolean(options.liveWrap) ? 'wrapped_live_fence': 'live_fence';
      token.info = `LiveFence${seq}`;
      const sid = `${resourcePath}.${seq}.fc.${options.liveFence}`;
      const compRequest = stringifyRequest(baseDir, sid);
      liveImport.push(`import ${token.info} from ${compRequest}\n`);
      sourceMap[token.info] = encodeURIComponent(token.content);
      defineDynamicModule(sid, token.content)
    }else if(options.exportType!=='vue'){
      token.type = 'fence_react'
    }
  }

  if (liveImport.length && options.liveWrap) {
    const fenceWrapRequest = stringifyRequest(baseDir, require.resolve(options.liveWrap))
    liveImport.push(`import LiveWrap from ${fenceWrapRequest}\n`)
  }

  if (options.exportType === 'vue') {
    return `${liveImport.join('')}
const sourceMap = JSON.parse(\`${JSON.stringify(sourceMap)}\`);
export default {
    render(){
        return (<div class="${options.className}">${parser.renderTokens(tokens)}</div>)
    }
}`;
  } else {
    let html = parser.renderTokens(tokens)
    html = html.replace(/class=/g, 'className=')
    return `
import React from "react";
${liveImport.join('')}
const sourceMap = JSON.parse(\`${JSON.stringify(sourceMap)}\`);
export default function(){
  return (<div className="${options.className}">${html}</div>)
}`
  }
}
