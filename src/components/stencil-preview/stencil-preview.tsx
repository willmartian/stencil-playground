import { Component, Host, h, getAssetPath } from '@stencil/core';
import { getComponentData, getComponentList, getSrcDoc, setProperty } from '../../utils/utils';

@Component({
  tag: 'stencil-preview',
  styleUrl: 'stencil-preview.css',
  assetsDirs: ['assets'],
  shadow: false,
})
export class StencilPreview {
  render() {
    return (
      <Host>
        <ion-card id="options-card" color="dark">
          <ion-card-content>
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
                          <ion-label>{prop.name + ': '}</ion-label>
                          {prop.type === 'string' && (
                            <ion-input
                              value={prop?.defaultValue?.replaceAll('"')}
                              slot="end"
                              type="text"
                              onIonChange={e => setProperty(component, prop.name, e.detail.value)}
                            ></ion-input>
                          )}
                          {prop.type === 'boolean' && (
                            <ion-toggle checked={prop.defaultValue === 'true'} onIonChange={e => setProperty(component, prop.name, e.detail.checked)}></ion-toggle>
                          )}
                        </ion-item>
                      ))}
                    </ion-list>
                  </ion-accordion>
                );
              })}
            </ion-accordion-group>
          </ion-card-content>
        </ion-card>
        <div style={{ '--background-image': `url("${getAssetPath('./assets/iphone-device-skin.png')}")` }} class={`docs-demo-device ios`}>
          <figure>
            <svg class="docs-demo-device__md-bar" viewBox="0 0 1384.3 40.3">
              <path class="st0" d="M1343 5l18.8 32.3c.8 1.3 2.7 1.3 3.5 0L1384 5c.8-1.3-.2-3-1.7-3h-37.6c-1.5 0-2.5 1.7-1.7 3z" />
              <circle class="st0" cx="1299" cy="20.2" r="20" />
              <path
                class="st0"
                d="M1213 1.2h30c2.2 0 4 1.8 4 4v30c0 2.2-1.8 4-4 4h-30c-2.2 0-4-1.8-4-4v-30c0-2.3 1.8-4 4-4zM16 4.2h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
              />
            </svg>
            <svg class="docs-demo-device__ios-notch" viewBox="0 0 219 31">
              <path d="M0 1V0h219v1a5 5 0 0 0-5 5v3c0 12.15-9.85 22-22 22H27C14.85 31 5 21.15 5 9V6a5 5 0 0 0-5-5z" fill-rule="evenodd" />
            </svg>
            <iframe loading="lazy" importance="low" srcDoc={getSrcDoc()} />
          </figure>
        </div>
      </Host>
    );
  }
}
