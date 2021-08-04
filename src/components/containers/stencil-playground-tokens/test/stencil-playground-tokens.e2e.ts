import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-tokens', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-tokens></stencil-playground-tokens>');

    const element = await page.find('stencil-playground-tokens');
    expect(element).toHaveClass('hydrated');
  });
});
