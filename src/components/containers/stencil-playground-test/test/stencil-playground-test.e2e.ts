import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-test></stencil-playground-test>');

    const element = await page.find('stencil-playground-test');
    expect(element).toHaveClass('hydrated');
  });
});
