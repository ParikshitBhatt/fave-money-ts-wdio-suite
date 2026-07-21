import { BasePage } from './base.page';

export class LandingPage extends BasePage {
  private payAnyoneButtonSelector = '//android.view.View[contains(@content-desc, "PAY")]';
  private homeNavigationButtonSelector = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView[2]';
  private groupsNavigationButtonSelector = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView[4]';

  public get payAnyoneButton() {
    return $(this.payAnyoneButtonSelector);
  }

  public get homeNavigationButton() {
    return $(this.homeNavigationButtonSelector);
  }

  public get groupsNavigationButton() {
    return $(this.groupsNavigationButtonSelector);
  }

  async navigateToHome() {
    await this.homeNavigationButton.click();
  }

  async navigateToGroups() {
    await this.groupsNavigationButton.click();
  }
}
