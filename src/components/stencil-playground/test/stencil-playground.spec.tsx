import { newSpecPage } from '@stencil/core/testing';
import { StencilPlayground } from '../stencil-playground';

describe('stencil-playground', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlayground],
      html: `<stencil-playground></stencil-playground>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground>
    `);
  });
});
