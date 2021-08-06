import { Component, Host, h, Prop, Element, State, Listen } from '@stencil/core';
import state from '../../store/editor-store';

@Component({
  tag: 'stencil-playground',
  styleUrl: 'stencil-playground.css',
})
export class StencilPlayground {
  @Element() element: HTMLElement;

  @Prop() script: string;
  @Prop() css: string;
  @Prop({
    attribute: 'readonly'
  }) readOnly: boolean;

  @State() currentView: 'script' | 'css' | 'preview' = 'script';

  private scriptBtnEl!: HTMLIonSegmentButtonElement;
  private cssBtnEl!: HTMLIonSegmentButtonElement;
  private previewBtnEl!: HTMLIonSegmentButtonElement;

  componentWillLoad() {
    state.readOnly = this.readOnly;
    state.script = this.scriptContent;
    state.css = this.cssContent;
  }

  @Listen('keydown', {
    target: 'window',
  })
  handleTabSwitch(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.key === '1') {
      this.scriptBtnEl.click();
    }
    if (ev.ctrlKey && ev.key === '2') {
      this.cssBtnEl.click();
    }
    if (ev.ctrlKey && ev.key === '3') {
      this.previewBtnEl.click();
    }
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
        return <ion-content color="dark"><stencil-editor type="script" language="typescript" /></ion-content>;
      case 'css':
        return <ion-content color="dark"><stencil-editor type="css" language="css" /></ion-content>;
      case 'preview':
        return <ion-content><stencil-preview /></ion-content>;
      default:
        return <div>Error</div>;
    }
  }

  render() {
    return (
      <Host>
        <ion-app>
          {this.switchView()}
          <ion-footer color="dark">
            <ion-segment value="script" color="dark" onIonChange={this.segmentChanged.bind(this)}>
              <ion-segment-button value="script" layout="icon-start" ref={el => (this.scriptBtnEl = el)}>
                <ion-icon name="logo-stencil"></ion-icon>
                <ion-label>Stencil</ion-label>
              </ion-segment-button>
              <ion-segment-button value="css" ref={el => (this.cssBtnEl = el)}>
                <ion-label>CSS</ion-label>
              </ion-segment-button>
              <ion-segment-button id="segment-button-preview" value="preview" ref={el => (this.previewBtnEl = el)}>
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
