import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-menu',
  styleUrl: 'stencil-playground-menu.css',
  shadow: true,
})
export class StencilPlaygroundMenu {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
