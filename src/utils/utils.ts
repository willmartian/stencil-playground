import type { transpile as StencilTranspiler } from '@stencil/core/compiler';
import state from '../store/editor-store';

interface StencilInBrowser {
  transpile?: typeof StencilTranspiler;
  inspect?: any;
}

declare global {
  interface Window {
    stencil: StencilInBrowser;
    stencilDevServer: any;
  }
}

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const injectScript = (): Promise<StencilInBrowser> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = 'https://cdn.jsdelivr.net/npm/@stencil/core@2.6.0/compiler/stencil.min.js';
    script.onload = () => {
      resolve(window.stencil);
    };
    script.onerror = e => {
      reject(e);
    };

    document.body.appendChild(script);
  });
};

export const getCompiler = async () => {
  window.stencilDevServer = window.stencil;
  window.stencil = undefined;
  const loadScript = async () => {
    if (!!window.stencil) {
      return window.stencil as StencilInBrowser;
    } else {
      return await injectScript();
    }
  };

  const result = await loadScript();

  // for the dev server, add back in the .inspect method
  if (!result.inspect) {
    window.stencil = { ...window.stencil, ...window.stencilDevServer };
  }

  return await loadScript();
};

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
  const compiler = await getCompiler();
  const result = await compiler.transpile(string);
  const code = sanitizeCodeForBrowser(result.code);
  state.transpiled = code;
};
