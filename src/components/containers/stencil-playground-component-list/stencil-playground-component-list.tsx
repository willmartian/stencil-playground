import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-component-list',
  styleUrl: 'stencil-playground-component-list.css',
  shadow: true,
})
export class StencilPlaygroundComponentList {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
