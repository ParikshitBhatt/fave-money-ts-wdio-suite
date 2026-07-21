export class BasePage {
  async waitVisible(selector: string) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 15000 });
    return el;
  }

  async waitClickable(selector: string) {
    const el = await $(selector);
    await el.waitForClickable({ timeout: 15000 });
    return el;
  }

  async isDisplayed(selector: string): Promise<boolean> {
    try {
      return await $(selector).isDisplayed();
    } catch {
      return false;
    }
  }

  async textOf(selector: string): Promise<string> {
    const el = await this.waitVisible(selector);
    return el.getText();
  }
}
