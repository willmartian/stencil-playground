import { Component, Host, h, Prop, Element } from '@stencil/core';
import state from '../../store/editor-store';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
  shadow: true,
})
export class StencilPlayground {
  @Element() element: HTMLElement;

  @Prop() script: string;
  @Prop() css: string;

  componentWillLoad() {
    state.script = this.scriptContent;
    state.css = this.cssContent;
  }

  get scriptContent() {
    if (this.element.querySelector("template[slot='script']")) {
      return (this.element.querySelector("template[slot='script']") as HTMLTemplateElement).content.querySelector('script').innerText;
    } else if (typeof this.script === 'string') {
      return this.script;
    }
  }

  get cssContent() {
    if (this.element.querySelector("template[slot='css']")) {
      return (this.element.querySelector("template[slot='css']") as HTMLTemplateElement).content.querySelector('style').innerText;
    } else if (typeof this.css === 'string') {
      return this.css;
    }
  }

  render() {
    return (
      <Host>
        <stencil-editor />
        <stencil-preview />

        <slot name="script" />
        <slot name="css" />
      </Host>
    );
  }
}
