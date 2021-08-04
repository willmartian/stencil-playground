import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-definition-container',
  styleUrl: 'stencil-playground-definition-container.css',
  shadow: true,
})
export class StencilPlaygroundDefinitionContainer {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
