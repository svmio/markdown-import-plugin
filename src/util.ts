import {Parser} from "./parser";
import MarkdownIt = require("markdown-it");
import path = require('path');

export let parser: Parser

export function initParser(opts?: MarkdownIt.Options) {
  parser = new Parser(opts)
  return parser
}

const matchRelativePath = /^\.\.?[/\\]/;

export function isAbsolutePath(str: string) {
  return path.posix.isAbsolute(str) || path.win32.isAbsolute(str);
}

export function isRelativePath(str: string) {
  return matchRelativePath.test(str);
}

export function stringifyRequest(context: string, request: string) {
  const splitted = request.split('!');

  return JSON.stringify(
    splitted
      .map((part) => {
        // First, separate singlePath from query, because the query might contain paths again
        const splittedPart = part.match(/^(.*?)(\?.*)/);
        const query = splittedPart ? splittedPart[2] : '';
        let singlePath = splittedPart ? splittedPart[1] : part;

        if (isAbsolutePath(singlePath) && context) {
          singlePath = path.relative(context, singlePath);

          if (isAbsolutePath(singlePath)) {
            // If singlePath still matches an absolute path, singlePath was on a different drive than context.
            // In this case, we leave the path platform-specific without replacing any separators.
            // @see https://github.com/webpack/loader-utils/pull/14
            return singlePath + query;
          }

          if (isRelativePath(singlePath) === false) {
            // Ensure that the relative path starts at least with ./ otherwise it would be a request into the modules directory (like node_modules).
            singlePath = './' + singlePath;
          }
        }

        return singlePath.replace(/\\/g, '/') + query;
      })
      .join('!')
  );
}
