import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-definition-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-definition-container></stencil-playground-definition-container>');

    const element = await page.find('stencil-playground-definition-container');
    expect(element).toHaveClass('hydrated');
  });
});
