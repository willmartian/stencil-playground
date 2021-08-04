import { newSpecPage } from '@stencil/core/testing';
import { StencilEditor } from '../stencil-editor';

describe('stencil-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilEditor],
      html: `<stencil-editor></stencil-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-editor>
    `);
  });
});
