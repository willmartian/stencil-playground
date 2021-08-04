import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundTest } from '../stencil-playground-test';

describe('stencil-playground-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundTest],
      html: `<stencil-playground-test></stencil-playground-test>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-test>
    `);
  });
});
