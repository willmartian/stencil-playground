import type { transpile as StencilTranspiler } from '@stencil/core/compiler';
import state, { set } from '../store/editor-store';
import type * as Monaco from 'monaco-editor';

interface StencilInBrowser {
  transpile?: typeof StencilTranspiler;
  inspect?: any;
}

declare global {
  interface Window {
    stencil: StencilInBrowser;
    stencilDevServer: any;
    monaco: typeof Monaco;
  }
}

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const injectScript = (): Promise<StencilInBrowser> => {
  return new Promise((resolve, reject) => {
    if (!window?.stencil?.transpile && !!window?.stencil?.inspect) {
      window.stencilDevServer = window.stencil;
      window.stencil = undefined;
    }

    const script = document.createElement('script');

    script.src = 'https://cdn.jsdelivr.net/npm/@stencil/core@2.6.0/compiler/stencil.min.js';
    script.onload = () => {
      // for the dev server, add back in the .inspect method
      if (!window?.stencil?.inspect) {
        Object.assign(window.stencil, window.stencilDevServer);
      }

      resolve(window.stencil);
    };
    script.onerror = e => {
      reject(e);
    };

    document.body.appendChild(script);
  });
};

export const getCompiler = async () => {
  const loadScript = async () => {
    if (!!window.stencil && !!window?.stencil?.transpile) {
      return window.stencil as StencilInBrowser;
    } else {
      return await injectScript();
    }
  };

  await loadScript();

  return window.stencil;
};

export const sanitizeCodeForBrowser = (code: string) => {
  console.log(state.css);
  // These definitions don't work in browser
  const searchDefinitions = `} from "@stencil/core/internal/client";`;
  // These ones do
  const replaceDefinitions = `} from "https://cdn.skypack.dev/@stencil/core/internal/client";`;

  const hyperScriptDefinitions = `import { h } from "@stencil/core/internal/client";`;
  const replaceHyperScript = `import { h } from "https://cdn.skypack.dev/@stencil/core";`;

  const styleDefinition = `static get style() { return myComponentStyle; }`;
  const styleReplacement = `static get style() { return \"${state.css.replace(/(\r\n|\n|\r)/gm, '')}\"; }`;

  const constructibleStyleSheet = `import myComponentStyle from "./my-component.css?tag=my-component&encapsulation=shadow";`;

  return code
    .replace(searchDefinitions, replaceDefinitions)
    .replace(hyperScriptDefinitions, replaceHyperScript)
    .replace(styleDefinition, styleReplacement)
    .replace(constructibleStyleSheet, '');
};

export const transpileCode = async string => {
  const compiler = await getCompiler();
  const result = await compiler.transpile(string);
  const code = sanitizeCodeForBrowser(result.code);
  console.error(code);
  set('transpiled', code);
  set('buildResult', result);
};

export const getSrcDoc = () => {
  return `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Story: ${state.buildResult.data.map(d => `${d.tagName} (${d.componentClassName})`).join(', ')}</title>
  <script src="https://cdn.jsdelivr.net/npm/axe-core@4.3.2/axe.min.js"></script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@stencil/core@latest/compiler/stencil.min.js"></script>
  <script type="module">${state.transpiled}</script>
  <style>my-component {visiblity: visible !important;}</style>
</head>
<body>
  ${state?.content ?? getDemoHTML()}
</body>
</html>
`;
};

export const setProperty = (component, name, newValue) => {
  let props = state.propValues;

  props = props.map(prop => {
    return prop.component === component && prop.name === name ? { ...prop, value: newValue } : prop;
  });

  set('propValues', props);
};

export const getDemoHTML = () => {
  return getComponentList()
    .map(c => getComponentDemoHTML(c))
    .join('\n');
};

export const getComponentDemoHTML = (component: string) => {
  return `<${component} ${getComponentDemoPropertiesHTML(component)}></${component}>`;
};

export const printAccurateAttribute = prop => {
  if (prop.type === 'boolean') {
    return `${prop.value === true ? prop.name : ''}`;
  } else {
    return `${prop.name}="${prop?.value}"`.toString();
  }
};

export const getComponentDemoPropertiesHTML = (component: string) => {
  return state.propValues.map(prop => prop.component === component && printAccurateAttribute(prop)).join(' ');
};

export const getComponentList = () => {
  return state.buildResult.data.map(e => e.tagName);
};

export const getComponentData = (component: string = 'my-component') => {
  return state.buildResult.data.find(e => e.tagName === component);
};
