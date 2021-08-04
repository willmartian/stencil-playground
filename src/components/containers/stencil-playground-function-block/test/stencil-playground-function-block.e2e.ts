import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-function-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-function-block></stencil-playground-function-block>');

    const element = await page.find('stencil-playground-function-block');
    expect(element).toHaveClass('hydrated');
  });
});
