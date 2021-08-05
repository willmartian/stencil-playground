import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import state from '../../store/editor-store';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
})
export class StencilPlayground {
  @Element() element: HTMLElement;

  @Prop() script: string;
  @Prop() css: string;
  @Prop() readOnly: boolean;

  @State() currentView: 'script' | 'css' | 'preview' = 'script';

  componentWillLoad() {
    state.readOnly = this.readOnly;
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

  private segmentChanged(ev) {
    console.log(ev.target.value);
    this.currentView = ev.target.value;
  }

  private switchView() {
    switch (this.currentView) {
      case 'script':
        return <stencil-editor type="script" language="typescript" />;
      case 'css':
        return <stencil-editor type="css" language="css" />;
      case 'preview':
        return <stencil-preview />;
      default:
        return <div>Error</div>;
    }
  }

  render() {
    return (
      <Host>
        <ion-app>
          <ion-content color="medium" class={this.currentView}>
            {this.switchView()}
          </ion-content>
          <ion-footer color="dark">
            <ion-segment value="script" color="dark" onIonChange={this.segmentChanged.bind(this)}>
              <ion-segment-button value="script">
                <ion-label>Definition</ion-label>
              </ion-segment-button>
              <ion-segment-button value="css">
                <ion-label>Style</ion-label>
              </ion-segment-button>
              <ion-segment-button id="segment-button-preview" value="preview">
                <ion-label>Preview</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-footer>
        </ion-app>

        <slot name="script" />
        <slot name="css" />
      </Host>
    );
  }
}
