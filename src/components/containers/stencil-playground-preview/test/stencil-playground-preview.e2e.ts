import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-preview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-preview></stencil-playground-preview>');

    const element = await page.find('stencil-playground-preview');
    expect(element).toHaveClass('hydrated');
  });
});
