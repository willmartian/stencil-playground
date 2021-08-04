import { Component, Host, h, Element, State } from '@stencil/core';
import ace from 'ace-builds';
import Prism from 'prismjs';

@Component({
  tag: 'stencil-editor',
  styleUrl: 'stencil-editor.css',
  shadow: true,
})
export class StencilEditor {

  @Element() el: HTMLElement;

  @State() editor: ace.Ace.Editor;


  componentDidLoad() {
    this.editor = ace.edit("editor-container");
  }

  render() {
    return (
      <Host>
        <div id="editor-container"></div>
      </Host>
    );
  }

}
