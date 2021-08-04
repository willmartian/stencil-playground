import { newE2EPage } from '@stencil/core/testing';

describe('stencil-preview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-preview></stencil-preview>');

    const element = await page.find('stencil-preview');
    expect(element).toHaveClass('hydrated');
  });
});
