import { Component, Host, h, Element, State, getAssetPath } from '@stencil/core';

@Component({
  tag: 'stencil-editor',
  styleUrl: 'stencil-editor.css',
  shadow: true,
})
export class StencilEditor {
  @Element() el: HTMLElement;

  @State() editor: monaco.editor.IStandaloneCodeEditor;

  private editorEl: HTMLDivElement;

  componentWillLoad() {
    const el = document.createElement('script');
    el.src = getAssetPath('./vendor/esm/vs/editor/editor.all.js');
    document.head.append(el);
  }

  componentDidLoad() {
    console.log(this.editorEl);
    monaco.editor.create(this.editorEl, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript',
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
