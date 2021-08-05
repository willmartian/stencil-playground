import stencil from '@stencil/core/compiler';
import state from '../store/editor-store';

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const sanitizeCodeForBrowser = (code: string) => {
  // These definitions don't work in browser
  const searchDefinitions = `import { defineCustomElement as __stencil_defineCustomElement } from "@stencil/core/internal/client"`;

  // These ones do
  const replaceDefinitions = `import { defineCustomElement as __stencil_defineCustomElement } from "https://cdn.skypack.dev/@stencil/core/internal/client"`;

  // We'll also need to add jsx so we can execute this code
  const insertHyperscript = `import { h } from "https://cdn.skypack.dev/@stencil/core"`;

  return code.replace(`${searchDefinitions};`, `${replaceDefinitions}; ${insertHyperscript};`);
};

export const transpileCode = async string => {
  const result = await stencil.transpile(string);
  const code = sanitizeCodeForBrowser(result.code);
  state.transpiled = code;
};
