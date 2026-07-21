import { BasePage } from './base.page';

export class GroupPage extends BasePage {
  private createYourFirstSplitGroupButtonSelector = '~Create your first split group';
  private createANewGroupButtonSelector = '~Create a new group';
  private nameYourGroupLabelSelector = '~Name your group';
  private groupNameInputSelector = '//android.widget.EditText';
  private looksGoodButtonSelector = '~Looks good';
  private contactAllowPermissionSelector = 'id:com.android.permissioncontroller:id/permission_allow_button';
  private continueButtonSelector = '~continue';
  private addPersonAndCreateGroupButtonSelector = '//android.view.View[contains(@content-desc, "person and create group")]';

  //TODO: Move this to separate component "Add Transaction"
  private addATransactionButtonSelector = '~+ Add a transaction';
  private createManualTransactionButtonSelector = '~Create a manual transaction';
  private paidToInputSelector = '//android.widget.EditText[1]';
  private amountInputSelector = '//android.widget.EditText[2]';
  private saveTransactionButtonSelector = '~Save this transaction';
  private splitScreenHeaderSelector = '~SPLIT AND ADD TO A GROUP';
  private confirmSplitButtonSelector = '~confirm split';

  //TODO: Create separate "Transaction" component
  private youGetAmountSelector = '//android.view.View[contains(@content-desc, "You get ₹")]';
  private owesYouAmountSelector = '//android.view.View[contains(@content-desc, "owes you : ₹")]';
  private settleUpButtonSelector = '~Settle up';

  public get createYourFirstSplitGroupButton() {
    return $(this.createYourFirstSplitGroupButtonSelector);
  }

  public get createANewGroupButton() {
    return $(this.createANewGroupButtonSelector);
  }

  public get nameYourGroupLabel() {
    return $(this.nameYourGroupLabelSelector);
  }

  public get groupNameInput() {
    return $(this.groupNameInputSelector);
  }

  public get looksGoodButton() {
    return $(this.looksGoodButtonSelector);
  }

  public get contactAllowPermission() {
    return $(this.contactAllowPermissionSelector);
  }

  public get continueButton() {
    return $(this.continueButtonSelector);
  }

  public get addPersonAndCreateGroupButton() {
    return $(this.addPersonAndCreateGroupButtonSelector);
  }

  public get addATransactionButton() {
    return $(this.addATransactionButtonSelector);
  }

  public get createManualTransactionButton() {
    return $(this.createManualTransactionButtonSelector);
  }

  public get paidToInput() {
    return $(this.paidToInputSelector);
  }

  public get amountInput() {
    return $(this.amountInputSelector);
  }

  public get saveTransactionButton() {
    return $(this.saveTransactionButtonSelector);
  }

  public get splitScreenHeader() {
    return $(this.splitScreenHeaderSelector);
  }

  public get confirmSplitButton() {
    return $(this.confirmSplitButtonSelector);
  }

  public get youGetAmount() {
    return $(this.youGetAmountSelector);
  }

  public get owesYouAmount() {
    return $(this.owesYouAmountSelector);
  }

  public get settleUpButton() {
    return $(this.settleUpButtonSelector);
  }

  async selectFriendByIndex(index: 1 | 2 | 3 | 4) {
    const friend = $(`~friend ${index}`);
    await friend.waitForDisplayed({ timeout: 5000 });
    await friend.click();
  }

  async addContactByName(name: string) {
    const allowPermissionButton = $(this.contactAllowPermissionSelector);
    if (await allowPermissionButton.isDisplayed()) {
      await allowPermissionButton.click();
    }
    const contact = $(`//android.view.View[contains(@content-desc, "${name}")]`);
    await contact.waitForDisplayed({ timeout: 5000 });
    await contact.click();
    await this.continueButton.waitForDisplayed({ timeout: 5000 });
    await this.continueButton.click();
  }

  async isGroupListed(groupName: string): Promise<boolean> {
    const group = $(`//android.view.View[contains(@content-desc, "${groupName}")]`);
    await group.waitForDisplayed();
    return await group.isDisplayed();
  }

  async selectGroup(groupName: string) {
    const group = $(`//android.view.View[contains(@content-desc, "${groupName}")]`);
    await group.waitForDisplayed({ timeout: 5000 });
    await group.click();
  }

  async setPaidTo(name: string) {
    await this.paidToInput.waitForDisplayed({ timeout: 5000 });
    await this.paidToInput.click(); // Ensure the input is focused before setting the value
    await this.paidToInput.setValue(name);
  }

  async setAmount(amount: string) {
    await this.amountInput.waitForDisplayed({ timeout: 5000 });
    await this.amountInput.click(); // Ensure the input is focused before setting the value
    await this.amountInput.setValue(amount);
  }

  async getSplitCountByAmount(splitAmount: string): Promise<number> {
    const length = await $$(`//android.view.View[@text="${splitAmount}"]`).length;
    return length;
  }
}
