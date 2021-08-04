import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-tokens',
  styleUrl: 'stencil-playground-tokens.css',
  shadow: true,
})
export class StencilPlaygroundTokens {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
