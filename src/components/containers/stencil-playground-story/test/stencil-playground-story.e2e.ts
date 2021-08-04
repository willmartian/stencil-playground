import { newE2EPage } from '@stencil/core/testing';

describe('stencil-playground-story', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-playground-story></stencil-playground-story>');

    const element = await page.find('stencil-playground-story');
    expect(element).toHaveClass('hydrated');
  });
});
