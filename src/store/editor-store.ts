import { createStore } from '@stencil/store';
import { transpileCode } from '../utils/utils';

const { state, onChange, on } = createStore({
  css: null,
  script: null,
  transpiled: null,
});

onChange('script', v => transpileCode(v));

on('set', prop => {
  console.log('Updated:', prop);
});

export default state;