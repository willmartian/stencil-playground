import { Component, Host, h, Element, State } from '@stencil/core';
import type * as Monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';

@Component({
  tag: 'stencil-editor',
  styleUrl: 'stencil-editor.css',
})
export class StencilEditor {
  @Element() el: HTMLElement;

  @State() editor: Monaco.editor.IStandaloneCodeEditor;

  private editorEl: HTMLDivElement;

  componentDidLoad() {
    loader.init().then(monaco => {
      this.editor = monaco.editor.create(this.editorEl, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'typescript',
      });
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
