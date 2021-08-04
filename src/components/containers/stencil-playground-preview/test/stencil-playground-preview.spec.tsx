import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundPreview } from '../stencil-playground-preview';

describe('stencil-playground-preview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundPreview],
      html: `<stencil-playground-preview></stencil-playground-preview>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-preview>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-preview>
    `);
  });
});
