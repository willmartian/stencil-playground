import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-style',
  styleUrl: 'stencil-playground-style.css',
  shadow: true,
})
export class StencilPlaygroundStyle {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
