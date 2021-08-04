import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-test',
  styleUrl: 'stencil-playground-test.css',
  shadow: true,
})
export class StencilPlaygroundTest {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
