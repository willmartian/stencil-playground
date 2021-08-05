import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  css: null,
  script: null,
  transpiled: null,
});

export default state;

export {
  onChange
}
