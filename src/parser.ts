import MarkdownIt = require("markdown-it");
import Token = require("markdown-it/lib/token");

export class Parser extends MarkdownIt {

  option: MarkdownIt.Options

  constructor(opts?: MarkdownIt.Options) {
    const temp = opts || {}
    super(temp);
    this.option = temp
    this.attach()
  }

  renderTokens(tokens: Token[]) {
    return this.renderer.render(tokens, this.option, {})
  }

  private attach() {

    this.renderer.rules.wrapped_live_fence = function (tokens, idx) {
      const token = tokens[idx];
      return `<LiveWrap content={decodeURIComponent(sourceMap['${token.info}'])}><${token.info}/></LiveWrap>`
    }

    this.renderer.rules.live_fence = function (tokens, idx) {
      const token = tokens[idx];
      return `<${token.info}/>`
    }

    this.renderer.rules.fence_react = function (tokens, idx,options){
      const token = tokens[idx];
      return `<pre><code className="${options.langPrefix}-${token.info}">{\`${token.content}\`}</code></pre>`
    }
  }

}

