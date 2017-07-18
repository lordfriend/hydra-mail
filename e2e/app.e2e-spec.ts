import { HydraMailPage } from './app.po';

describe('hydra-mail App', () => {
  let page: HydraMailPage;

  beforeEach(() => {
    page = new HydraMailPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
