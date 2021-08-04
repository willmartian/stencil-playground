import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-preview',
  styleUrl: 'stencil-preview.css',
  shadow: true,
})
export class StencilPreview {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
