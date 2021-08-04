import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-playground-story',
  styleUrl: 'stencil-playground-story.css',
  shadow: true,
})
export class StencilPlaygroundStory {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
