import { TranspileResults } from '@stencil/core/compiler';
import { createStore } from '@stencil/store';
import { getComponentData, getComponentList, transpileCode } from '../utils/utils';

interface PropValues {
  component: string;
  name: string;
  value: any;
  type: any;
}
interface PreviewStore {
  css: string;
  script: string;
  content: string;
  transpiled: string;
  buildResult: TranspileResults;
  propValues: PropValues[];
  readOnly: boolean;
  monacoAvailable: boolean;
}

const initialStore: PreviewStore = {
  css: null,
  script: null,
  content: null,
  transpiled: null,
  buildResult: null,
  readOnly: false,
  monacoAvailable: false,
  propValues: [],
};

const { state, onChange, on, set } = createStore(initialStore);

onChange('script', v => transpileCode(v));
onChange('css', () => transpileCode(state.script));
// onChange('propValues', () => transpileCode(state.script));

onChange('buildResult', () => {
  const components = getComponentList();
  let defaultValues: PropValues[] = [];
  components.forEach(component => {
    getComponentData(component).properties.map(data => {
      let value = data.type === 'string' ? data?.defaultValue?.replaceAll('"', '') : data?.defaultValue;
      value = data.type === 'boolean' ? !!value : value;

      defaultValues.push({
        component,
        name: data.attribute,
        value,
        type: data.type,
      });
    });
  });

  set('propValues', defaultValues);
});

on('set', (prop, value) => {
  console.log('Updated:', prop);
  console.debug(prop, value);
});

export default state;

export { set, on, state, onChange };
