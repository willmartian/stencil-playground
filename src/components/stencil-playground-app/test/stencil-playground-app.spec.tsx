import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundApp } from '../stencil-playground-app';

describe('stencil-playground-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundApp],
      html: `<stencil-playground-app></stencil-playground-app>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-app>
    `);
  });
});
