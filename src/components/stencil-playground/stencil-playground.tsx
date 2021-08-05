import { Component, Host, h, Prop, Element } from '@stencil/core';
import state from '../../store/editor-store';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
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
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button menu="start" />
            </ion-buttons>
            {/* {/*value={view} onIonChange={e => setView(e.detail.value)}*/}
            <ion-segment>
              <ion-segment-button value="definition">
                <ion-label>Definition</ion-label>
              </ion-segment-button>
              <ion-segment-button value="style">
                <ion-label>Style</ion-label>
              </ion-segment-button>
              {/*  {/*onMouseUp={handleContextMenu}*/}
              <ion-segment-button id="segment-button-preview" value="preview">
                <ion-label>Preview</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-toolbar>
        </ion-header>
        <stencil-editor />
        <stencil-preview />

        <slot name="script" />
        <slot name="css" />
      </Host>
    );
  }
}
