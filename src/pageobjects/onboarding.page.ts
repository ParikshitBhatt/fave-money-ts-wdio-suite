import { BasePage } from './base.page';

export class OnboardingPage extends BasePage {
    
    private tapToGetStartedButtonSelector = '//android.view.View[@content-desc="TAP TO GET STARTED\nTHE UPI APP\nFOR YOUR HOME"]';
    private enterYourMobileNumberLabelSelector = '~enter your mobile number';
    private inputSelector = '//android.widget.EditText';
    private continueButtonSelector = '~CONTINUE';
    private enterOtpLabelSelector = '~ENTER THE OTP WE JUST SENT YOU';
    private resendOtpLinkSelector = '~Didn’t get the OTP? Resend';
    private whatShouldWeCallYouLabelSelector = '~WHAT SHOULD WE CALL YOU?';
    private whoDoYouLiveWithLabelSelector = '~Who do you live with?';
    private tapToAddPeopleLabelSelector = '~Tap to add people';
    private looksGoodButtonSelector = '~Looks Good';
    private homeNameSelector = '~Test\'s home';
    private yourHomeIsNowOnFaveLabelSelector = '//android.view.View[@content-desc="Your home is now\non Fave"]';
    private whatDoesAHomeDoButtonSelector = '~What does a home do?';
    private tellMeMoreButtonSelector = '~Tell me more';
    private letSGetStartedButtonSelector = '~let’s get started';
    private letSMakeSomeoneSDayLabelSelector = '~Let’s make someone’s day';
    private sendAGiftLabelSelector = '//android.view.View[contains(@content-desc, "Send a ₹5 gift to a loved one")]';
    private setUpUpiButtonSelector = '~SET UP UPI IN 2 MINS';
    private skipButtonSelector = '~SKIP';
    private takeMeHomeButtonSelector = '~Take me home';
    
    public get tapToGetStartedButton() {
        return $(this.tapToGetStartedButtonSelector);
    }

    public get enterYourMobileNumberLabel() {
        return $(this.enterYourMobileNumberLabelSelector);
    }

    public get input() {
        return $(this.inputSelector);
    }

    public get continueButton() {
        return $(this.continueButtonSelector);
    }

    public get enterOtpLabel() {
        return $(this.enterOtpLabelSelector);
    }

    public get resendOtpLink() {
        return $(this.resendOtpLinkSelector);
    }

    public get whatShouldWeCallYouLabel() {
        return $(this.whatShouldWeCallYouLabelSelector);
    }

    public get whoDoYouLiveWithLabel() {
        return $(this.whoDoYouLiveWithLabelSelector);
    }

    public get tapToAddPeopleLabel() {
        return $(this.tapToAddPeopleLabelSelector);
    }

    public get looksGoodButton() {
        return $(this.looksGoodButtonSelector);
    }

    public get homeName() {
        return $(this.homeNameSelector);
    }

    public get yourHomeIsNowOnFaveLabel() {
        return $(this.yourHomeIsNowOnFaveLabelSelector);
    }

    public get whatDoesAHomeDoButton() {
        return $(this.whatDoesAHomeDoButtonSelector);
    }

    public get tellMeMoreButton() {
        return $(this.tellMeMoreButtonSelector);
    }

    public get letSGetStartedButton() {
        return $(this.letSGetStartedButtonSelector);
    }

    public get letSMakeSomeoneSDayLabel() {
        return $(this.letSMakeSomeoneSDayLabelSelector);
    }

    public get sendAGiftLabel() {
        return $(this.sendAGiftLabelSelector);
    }

    public get setUpUpiButton() {
        return $(this.setUpUpiButtonSelector);
    }

    public get skipButton() {
        return $(this.skipButtonSelector);
    }

    public get takeMeHomeButton() {
        return $(this.takeMeHomeButtonSelector);
    }

    async selectPeopleForHome(name: 'Mom' | 'Dad' | 'Wife' | 'Husband' | 'Kid' | 'Brother' | 'Sister' | 'Flatmate' | '🥲 I live alone') {
        await $(`~${name}`).click();
    }
}
