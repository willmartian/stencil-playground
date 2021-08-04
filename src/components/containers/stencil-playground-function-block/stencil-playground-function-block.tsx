import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-function-block',
  styleUrl: 'stencil-playground-function-block.css',
  shadow: true,
})
export class StencilPlaygroundFunctionBlock {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
