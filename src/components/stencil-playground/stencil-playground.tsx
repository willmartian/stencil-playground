import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
  shadow: true,
})
export class StencilPlayground {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
