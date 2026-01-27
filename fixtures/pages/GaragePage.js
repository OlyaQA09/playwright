
class GaragePage {
    constructor (page) {
this.page = page;
this.addCarButton = page.locator('.btn.btn-primary').filter({ hasText: 'Add car' });
    this.addFuelExpenseButton = page.locator('.car_add-expense.btn.btn-success').filter({ hasText: /Add an expense/i });

    }
async goto() {
    await this.page.goto('/panel/garage');
    await this.page.waitForLoadState('networkidle');
  }
  async isGarageVisible() {
    return this.addCarButton.isVisible();
  }

}
export { GaragePage };