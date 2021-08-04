import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-app',
  styleUrl: 'stencil-playground-app.css',
  shadow: true,
})
export class StencilPlaygroundApp {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
