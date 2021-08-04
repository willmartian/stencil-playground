import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundTokens } from '../stencil-playground-tokens';

describe('stencil-playground-tokens', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundTokens],
      html: `<stencil-playground-tokens></stencil-playground-tokens>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-tokens>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-tokens>
    `);
  });
});
