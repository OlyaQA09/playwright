import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page, url) {
    super(page, url);
  }

  async navigateAndAuth() {
    await this.page.goto(this.url);
  }
}
