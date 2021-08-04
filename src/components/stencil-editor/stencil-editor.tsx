import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-editor',
  styleUrl: 'stencil-editor.css',
  shadow: true,
})
export class StencilEditor {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
