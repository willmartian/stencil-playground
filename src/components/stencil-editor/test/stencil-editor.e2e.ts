import { newE2EPage } from '@stencil/core/testing';

describe('stencil-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-editor></stencil-editor>');

    const element = await page.find('stencil-editor');
    expect(element).toHaveClass('hydrated');
  });
});
