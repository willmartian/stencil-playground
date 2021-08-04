import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-menu></stencil-playground-menu>');

    const element = await page.find('stencil-playground-menu');
    expect(element).toHaveClass('hydrated');
  });
});
