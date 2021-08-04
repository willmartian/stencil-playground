import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-preview',
  styleUrl: 'stencil-playground-preview.css',
  shadow: true,
})
export class StencilPlaygroundPreview {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
