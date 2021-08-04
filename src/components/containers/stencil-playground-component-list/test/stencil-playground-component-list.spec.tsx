import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundComponentList } from '../stencil-playground-component-list';

describe('stencil-playground-component-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundComponentList],
      html: `<stencil-playground-component-list></stencil-playground-component-list>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-component-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-component-list>
    `);
  });
});
