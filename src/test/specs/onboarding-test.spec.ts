import { LandingPage, OnboardingPage } from '../../pageobjects';
import { SimUtils } from '../../utils';

describe('Onboarding flow', () => {
    const simUtils = new SimUtils()
    const onboardingPage = new OnboardingPage();
    let mobileNumber: string;

    before(async () => {
        const simOption = await simUtils.getSimOption();
        mobileNumber = simOption['Phone Number'].replace('+91 ', '');
        await onboardingPage.tapToGetStartedButton.waitForDisplayed();
        await onboardingPage.tapToGetStartedButton.click();
    });

    it('should display the "Enter your mobile number" label', async () => {
        const isDisplayed = await onboardingPage.enterYourMobileNumberLabel.isDisplayed();
        expect(isDisplayed).toBe(true);
    });

    it('should allow entering a mobile number', async () => {
        await onboardingPage.input.setValue(mobileNumber);
        const value = await onboardingPage.input.getText();
        expect(value).toBe(mobileNumber);
    });

    it('should display the "Continue" button', async () => {
        const isDisplayed = await onboardingPage.continueButton.isDisplayed();
        expect(isDisplayed).toBe(true);
    });

    describe('OTP verification', () => {
        before(async () => {
            await onboardingPage.continueButton.click();
            await onboardingPage.enterOtpLabel.waitForDisplayed();
        });

        it('should display the "Enter OTP" label', async () => {
            const isDisplayed = await onboardingPage.enterOtpLabel.isDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should allow entering the OTP', async () => {
            const otp = await simUtils.getOTPFromNotification();
            await onboardingPage.input.setValue(otp);
            const value = await onboardingPage.input.getText();
            expect(value).toBe(otp);
        });

        it('should display the "Resend OTP" link', async () => {
            const isExist = await onboardingPage.resendOtpLink.isExisting();
            expect(isExist).toBe(true);
        });

        it('should display the "Continue" button', async () => {
            const isDisplayed = await onboardingPage.continueButton.isDisplayed();
            expect(isDisplayed).toBe(true);
        });

        describe('Post OTP verification', () => {
            before(async () => {
                await onboardingPage.continueButton.click();
                await onboardingPage.whatShouldWeCallYouLabel.waitForDisplayed();
            });

            it('should display the "What should we call you?" label', async () => {
                const isDisplayed = await onboardingPage.whatShouldWeCallYouLabel.isDisplayed();
                expect(isDisplayed).toBe(true);
            });
        });

        describe('Enter name and continue', () => {
            const name = 'Test User';
            before(async () => {
                await onboardingPage.input.setValue(name);
                await onboardingPage.continueButton.click();
                await onboardingPage.whoDoYouLiveWithLabel.waitForDisplayed();
            });

            it('should display the "Who do you live with?" label', async () => {
                const isDisplayed = await onboardingPage.whoDoYouLiveWithLabel.isDisplayed();
                expect(isDisplayed).toBe(true);
            });

            it('should display the "Tap to add people" label', async () => {
                const isDisplayed = await onboardingPage.tapToAddPeopleLabel.isDisplayed();
                expect(isDisplayed).toBe(true);
            });

            describe('Add people and continue', () => {
                before(async () => {
                    await onboardingPage.selectPeopleForHome('🥲 I live alone');
                    await onboardingPage.looksGoodButton.waitForDisplayed();
                    await onboardingPage.looksGoodButton.click();
                    await onboardingPage.yourHomeIsNowOnFaveLabel.waitForDisplayed();
                });

                it('should display the "Your home is now on Fave" label', async () => {
                    const isDisplayed = await onboardingPage.yourHomeIsNowOnFaveLabel.isDisplayed();
                    expect(isDisplayed).toBe(true);
                });

                it('should display the "What does a home do?" button', async () => {
                    const isDisplayed = await onboardingPage.whatDoesAHomeDoButton.isDisplayed();
                    expect(isDisplayed).toBe(true);
                });

                describe('Complete onboarding', () => {
                    const landingPage = new LandingPage();
                    before(async () => {
                        await onboardingPage.whatDoesAHomeDoButton.click();
                        await onboardingPage.tellMeMoreButton.waitForDisplayed();
                        let isLetSGetStartedDisplayed = await onboardingPage.letSGetStartedButton.isDisplayed();
                        while (!isLetSGetStartedDisplayed) {
                            await onboardingPage.tellMeMoreButton.click();
                            isLetSGetStartedDisplayed = await onboardingPage.letSGetStartedButton.isDisplayed()
                        }
                        await onboardingPage.letSGetStartedButton.click();
                        await onboardingPage.skipButton.click();
                        await onboardingPage.takeMeHomeButton.click();
                        await landingPage.payAnyoneButton.waitForDisplayed();
                    });

                    it('should display "Pay Anyone" button on landing/main page', async () => {
                        const isDisplayed = await landingPage.payAnyoneButton.isDisplayed();
                        expect(isDisplayed).toBe(true);
                    });
                });
            });
        });
    });
});