import { Component, Host, h, Prop, Element, State, Watch, Fragment } from '@stencil/core';
import state, { onChange } from '../../store/editor-store';
import { transpileCode } from '../../utils/utils';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
})
export class StencilPlayground {
  @Element() element: HTMLElement;

  @Prop() script: string;
  @Prop() css: string;

  @State() currentView: 'script' | 'css' | 'preview' = 'script';

  componentWillLoad() {
    state.script = this.scriptContent;
    state.css = this.cssContent;
    onChange('script', v => transpileCode(v));
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
    this.currentView = ev.target.value;
  }

  private switchView() {
    switch (this.currentView) {
      case 'script':
        return <stencil-editor />;
      case 'css':
        return <div>hello</div>;
      case 'preview':
        return <stencil-preview />;
      default:
        return <div>Error</div>
    }
  }

  render() {
    return (
      <Host>
        <ion-app>
          <ion-content>
            {this.switchView()}
          </ion-content>
          <ion-footer>
            <ion-segment value="script" onIonChange={this.segmentChanged.bind(this)}>
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
