import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-playground',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: '../node_modules/monaco-editor', dest: '../src/components/stencil-editor/vendor' }],
    },
  ],
};
