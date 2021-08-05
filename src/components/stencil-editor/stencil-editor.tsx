import { Component, Host, h, Element, State, Prop, Watch } from '@stencil/core';
import type * as Monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';
import state from '../../store/editor-store';

@Component({
  tag: 'stencil-editor',
  styleUrl: 'stencil-editor.css',
  shadow: false,
  scoped: true,
})
export class StencilEditor {
  @Element() el: HTMLElement;

  @State() editor: Monaco.editor.IStandaloneCodeEditor;

  @Prop() language: string = 'typescript';
  @Prop() type: 'script' | 'css' | 'html' = 'script';

  private editorEl: HTMLDivElement;
  private timeout;

  get state() {
    return state[this.type];
  }

  set state(value) {
    state[this.type] = value;
  }

  @Watch('type')
  handleTypeChange() {
    this.unmountEditor();
    setTimeout(() => {
      this.mountEditor();
    }, 1)
  }

  contentChanged(_event: Monaco.editor.IModelContentChangedEvent) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (!state.readOnly) {
        this.state = this.editor.getValue();
      }
    }, 350);
  }

  async componentDidLoad() {
    if (!!state.monacoAvailable) {
      this.mountEditor();
    } else {
      loader.init().then(monaco => {
        window.monaco = monaco;
        window.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          experimentalDecorators: true,
        });
        window.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: true,
        });
        state.monacoAvailable = true;
        this.mountEditor();
      });
    }
  }

  unmountEditor() {
    this.editor.dispose();
  }

  mountEditor() {
    this.editor = window.monaco.editor.create(this.editorEl, {
      value: this.state,
      language: this.language,
      readOnly: state.readOnly,
      theme: 'vs-dark',
      fontSize: 15,
    });

    this.editor.getModel().onDidChangeContent(this.contentChanged.bind(this));
  }

  render() {
    return (
      <Host>
        <div ref={e => (this.editorEl = e)} id="editor-container" />
      </Host>
    );
  }
}
