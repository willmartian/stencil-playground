import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundFunctionBlock } from '../stencil-playground-function-block';

describe('stencil-playground-function-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundFunctionBlock],
      html: `<stencil-playground-function-block></stencil-playground-function-block>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-function-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-function-block>
    `);
  });
});
