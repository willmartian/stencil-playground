import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundDefinitionContainer } from '../stencil-playground-definition-container';

describe('stencil-playground-definition-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundDefinitionContainer],
      html: `<stencil-playground-definition-container></stencil-playground-definition-container>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-definition-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-definition-container>
    `);
  });
});
