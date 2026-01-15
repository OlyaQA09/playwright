import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(page, url) {
    super(page, url);
  }

  async navigateAndAuth() {
    await this.page.goto(this.url);
  }
}
