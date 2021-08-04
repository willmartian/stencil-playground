import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground></stencil-playground>');

    const element = await page.find('stencil-playground');
    expect(element).toHaveClass('hydrated');
  });
});
