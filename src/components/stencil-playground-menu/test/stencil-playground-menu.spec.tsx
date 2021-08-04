import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundMenu } from '../stencil-playground-menu';

describe('stencil-playground-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundMenu],
      html: `<stencil-playground-menu></stencil-playground-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-menu>
    `);
  });
});
