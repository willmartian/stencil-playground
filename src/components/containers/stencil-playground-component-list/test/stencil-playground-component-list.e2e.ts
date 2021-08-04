import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-component-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-component-list></stencil-playground-component-list>');

    const element = await page.find('stencil-playground-component-list');
    expect(element).toHaveClass('hydrated');
  });
});
