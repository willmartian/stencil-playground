import { TranspileResults } from '@stencil/core/compiler';
import { createStore } from '@stencil/store';
import { transpileCode } from '../utils/utils';

interface PreviewStore {
  css: string;
  script: string;
  content: string;
  transpiled: string;
  buildResult: TranspileResults;
  readOnly: boolean;
}

const initialStore: PreviewStore = {
  css: null,
  script: null,
  content: null,
  transpiled: null,
  buildResult: null,
  readOnly: false,
};

const { state, onChange, on, set } = createStore(initialStore);

onChange('script', v => transpileCode(v));

on('set', prop => {
  console.log('Updated:', prop);
});

export default state;

export { set, on, state, onChange };
