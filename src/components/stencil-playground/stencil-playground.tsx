import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
  shadow: true,
})
export class StencilPlayground {

  @Prop() script: string;

  @Prop() css: string;

  render() {
    return (
      <Host>
        <stencil-editor></stencil-editor>
        <stencil-preview></stencil-preview>
      </Host>
    );
  }

}
