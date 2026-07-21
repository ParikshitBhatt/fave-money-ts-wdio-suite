import { homedir } from 'os';
import { LandingPage, OnboardingPage } from '../pageobjects';
import { SimUtils } from './sim-utils';

export async function ensureLoggedIn(isBrowserStack: boolean = false): Promise<LandingPage> {
  const landingPage = new LandingPage();
  const onboardingPage = new OnboardingPage();
  const simUtils = new SimUtils()
      
  if (isBrowserStack) {
    const simOption = await simUtils.getSimOption();
    const mobileNumber = simOption['Phone Number'].replace('+91 ', '');
    await onboardingPage.tapToGetStartedButton.click();
    await onboardingPage.input.setValue(mobileNumber);
    await onboardingPage.continueButton.click();
    const otp = await simUtils.getOTPFromNotification();
    await onboardingPage.input.setValue(otp);
    await onboardingPage.continueButton.click();
    await onboardingPage.skipButton.waitForDisplayed();
    await onboardingPage.skipButton.click();
    await landingPage.payAnyoneButton.waitForExist();
  }
  const onLandingPage = await landingPage.payAnyoneButton.isExisting();
  if (!onLandingPage) {
    throw new Error(
      'App is not past login/onboarding. Log in manually on this device/session ' +
      'first — see README "OTP & session" — then re-run the suite.',
    );
  }
  return new LandingPage();
}
