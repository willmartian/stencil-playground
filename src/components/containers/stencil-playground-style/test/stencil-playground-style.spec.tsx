import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundStyle } from '../stencil-playground-style';

describe('stencil-playground-style', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundStyle],
      html: `<stencil-playground-style></stencil-playground-style>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-style>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-style>
    `);
  });
});
