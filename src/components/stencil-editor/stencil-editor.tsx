import { Component, Host, h, Element, State, Prop } from '@stencil/core';
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

  @Prop() language: string;
  @Prop() type: 'script' | 'css' | 'html' = 'script';

  private editorEl: HTMLDivElement;
  private timeout;

  get state() {
    return state[this.type];
  }

  set state(value) {
    state[this.type] = value;
  }

  contentChanged(_event: Monaco.editor.IModelContentChangedEvent) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (!state.readOnly) {
        state.script = this.editor.getValue();
      }
    }, 350);
  }

  componentDidLoad() {
    loader.init().then(monaco => {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });

      this.editor = monaco.editor.create(this.editorEl, {
        value: this.state,
        language: this.language,
        readOnly: state.readOnly,
        theme: 'vs-dark',
        fontSize: 15,
      });

      this.editor.getModel().onDidChangeContent(this.contentChanged.bind(this));
    });
  }

  render() {
    return (
      <Host>
        <div ref={e => (this.editorEl = e)} id="editor-container" />
      </Host>
    );
  }
}
