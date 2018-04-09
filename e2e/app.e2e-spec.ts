import { MemberOptionsPage } from './app.po';

describe('member-options App', () => {
  let page: MemberOptionsPage;

  beforeEach(() => {
    page = new MemberOptionsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
