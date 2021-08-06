import { Component, Host, h, getAssetPath, Element } from '@stencil/core';
import { getComponentData, getComponentList, getSrcDoc, setProperty } from '../../utils/utils';

@Component({
  tag: 'stencil-preview',
  styleUrl: 'stencil-preview.css',
  assetsDirs: ['assets'],
  shadow: false,
})
export class StencilPreview {
  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <ion-split-pane when="sm">
          <ion-menu side="start" contentId="iframe-content">
            <ion-header>
              <ion-toolbar color="dark">
                <ion-title>
                  Components
                </ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content color="dark">
              <ion-accordion-group>
                {getComponentList().map(component => {
                  const data = getComponentData(component);

                  return (
                    <ion-accordion>
                      <ion-item slot="header" color="dark">
                        <item-label>{component}</item-label>
                      </ion-item>

                      <ion-list slot="content" class="prop-list" lines="full" style={{ paddingTop: '0', paddingBottom: '0' }}>
                        {data.properties.map(prop => (
                          <ion-item color="dark">
                            <ion-label><b>{prop.name + ': '}</b></ion-label>
                            {prop.type === 'string' && (
                              <ion-input
                                style={{textAlign: 'right'}}
                                value={prop?.defaultValue?.replaceAll('"', '')}
                                slot="end"
                                type="text"
                                onIonChange={e => setProperty(component, prop.name, e.detail.value)}
                              ></ion-input>
                            )}
                            {prop.type === 'boolean' && (
                              <ion-toggle style={{paddingRight: '0'}} checked={prop.defaultValue === 'true'} onIonChange={e => setProperty(component, prop.name, e.detail.checked)}></ion-toggle>
                            )}
                          </ion-item>
                        ))}
                      </ion-list>
                    </ion-accordion>
                  );
                })}
              </ion-accordion-group>
            </ion-content>
          </ion-menu>
          <ion-content id="iframe-content" scrollY={false}>
            <iframe srcDoc={getSrcDoc()} />
          </ion-content>
        </ion-split-pane>
      </Host>
    );
  }
}
