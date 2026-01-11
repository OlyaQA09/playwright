export class BaseElement {
  constructor(page) {
    this.page = page;
  }

  getElement(selector) {
    return this.page.locator(selector);
  }
}
