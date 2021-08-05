import { createStore } from '@stencil/store';
import { transpileCode } from '../utils/utils';

const { state, onChange, on, set } = createStore({
  css: null,
  script: null,
  transpiled: null,
  readOnly: false,
});

onChange('script', v => transpileCode(v));

on('set', prop => {
  console.log('Updated:', prop);
});

export default state;

export { set, on, state, onChange };