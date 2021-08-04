import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-app></stencil-playground-app>');

    const element = await page.find('stencil-playground-app');
    expect(element).toHaveClass('hydrated');
  });
});
