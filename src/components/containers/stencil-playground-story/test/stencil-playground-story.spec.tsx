import { newSpecPage } from '@stencil/core/testing';
import { StencilPlaygroundStory } from '../stencil-playground-story';

describe('stencil-playground-story', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilPlaygroundStory],
      html: `<stencil-playground-story></stencil-playground-story>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-playground-story>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-playground-story>
    `);
  });
});
