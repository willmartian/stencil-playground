import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-style', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-style></stencil-playground-style>');

    const element = await page.find('stencil-playground-style');
    expect(element).toHaveClass('hydrated');
  });
});
