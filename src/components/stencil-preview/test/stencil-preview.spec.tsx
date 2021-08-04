import { newSpecPage } from '@stencil/core/testing';
import { StencilPreview } from '../stencil-preview';

describe('stencil-preview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPreview],
      html: `<stencil-preview></stencil-preview>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-preview>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-preview>
    `);
  });
});
