import { expect } from '@wdio/globals';
import { ensureLoggedIn } from '../../utils';
import { LandingPage, GroupPage } from '../../pageobjects';
import { uniqueGroupName } from '../../utils';

describe('Smoke test - Groups', () => {
  const landingPage = new LandingPage();
  const groupPage = new GroupPage();

  const groupName = uniqueGroupName('Test Group');

  before(async () => {
    await ensureLoggedIn(true);
  });

  after(async () => {
    // Cleanup
  })

  describe('Create Group flow', () => {
    before(async () => {
      await landingPage.navigateToGroups();
    });

    it('should display the "Create your first split group" button', async () => {
      const isDisplayed = await groupPage.createYourFirstSplitGroupButton.isDisplayed();
      expect(isDisplayed).toBe(true);
    });

    describe('Create your first split group', () => {
      before(async () => {
        await groupPage.createYourFirstSplitGroupButton.click();
        await groupPage.createANewGroupButton.waitForDisplayed();
      });

      it('should display the "Create a new group" button', async () => {
        const isDisplayed = await groupPage.createANewGroupButton.isDisplayed();
        expect(isDisplayed).toBe(true);
      });

      describe('Create a new group', () => {
        before(async () => {
          await groupPage.createANewGroupButton.click();
        });

        it('should display the "Name your group" label', async () => {
          const isDisplayed = await groupPage.nameYourGroupLabel.isDisplayed();
          expect(isDisplayed).toBe(true);
        });

        it('should allow entering a group name', async () => {
          await groupPage.groupNameInput.setValue(groupName);
          const value = await groupPage.groupNameInput.getText();
          expect(value).toBe(groupName);
        });

        it('should display the "Looks good" button', async () => {
          const isDisplayed = await groupPage.looksGoodButton.isDisplayed();
          expect(isDisplayed).toBe(true);
        });

        describe('Add members', () => {
          before(async () => {
            await groupPage.looksGoodButton.click();
            await groupPage.selectFriendByIndex(1); // Adding 1 contact in group. 
            await groupPage.addContactByName('Firstname');
            await groupPage.addPersonAndCreateGroupButton.waitForDisplayed();
          });

          it('should display the "Add person and create group" button', async () => {
            const isDisplayed = await groupPage.addPersonAndCreateGroupButton.isDisplayed();
            expect(isDisplayed).toBe(true);
          });

          describe('Finalize group creation', () => {
            before(async () => {
              await groupPage.addPersonAndCreateGroupButton.click();
            });

            it('should display the newly created group in the list', async () => {
              const isGroupListed = await groupPage.isGroupListed(groupName);
              expect(isGroupListed).toBe(true);
            });
          });
        });
      });
    });
  })

  describe('Add Transaction flow', () => {
    before(async () => {
      await groupPage.selectGroup(groupName);
    });

    it('should display the "Add a transaction" button', async () => {
      const isDisplayed = await groupPage.addATransactionButton.isDisplayed();
      expect(isDisplayed).toBe(true);
    });

    describe('Add a transaction', () => {
      const paidToName = 'Spotify';
      const transactionAmount = '1000';

      before(async () => {
        await groupPage.addATransactionButton.click();
      });

      it('should display the "Create a manual transaction" button', async () => {
        const isDisplayed = await groupPage.createManualTransactionButton.isDisplayed();
        expect(isDisplayed).toBe(true);
      });

      describe('Create a manual transaction', () => {
        before(async () => {
          await groupPage.createManualTransactionButton.click();
        });

        it('should allow entering the "Paid to" field', async () => {
          await groupPage.setPaidTo(paidToName);
          const value = await groupPage.paidToInput.getText();
          expect(value).toBe(paidToName);
        });

        it('should allow entering the "Amount" field', async () => {
          await groupPage.setAmount(transactionAmount);
          const value = (await groupPage.amountInput.getText()).replace(',','');
          expect(value).toBe(transactionAmount);
        });

        it('should display the "Save this transaction" button', async () => {
          const isDisplayed = await groupPage.saveTransactionButton.isDisplayed();
          expect(isDisplayed).toBe(true);
        });

        describe('Finalize transaction creation', () => {
          before(async () => {
            await groupPage.saveTransactionButton.click();
          });

          it('should display the split screen header', async () => {
            const isDisplayed = await groupPage.splitScreenHeader.isDisplayed();
            expect(isDisplayed).toBe(true);
          });

          it('should display the "Confirm Split" button', async () => {
            const isDisplayed = await groupPage.confirmSplitButton.isDisplayed();
            expect(isDisplayed).toBe(true);
          });

          it('should display the correct split count for the entered amount', async () => {
            const splitCount = await groupPage.getSplitCountByAmount('500'); 
            expect(splitCount).toBe(2); // Split count should be 2 as 1000 is split between two people in this test case.
          });

          describe('Confirm split', () => {
            before(async () => {
              await groupPage.confirmSplitButton.click();
              await groupPage.settleUpButton.waitForDisplayed()
            });

            it('should display the "You get" amount', async () => {
              const isDisplayed = await groupPage.youGetAmount.isDisplayed();
              expect(isDisplayed).toBe(true);
            });

            it('should display the "Owes you" amount', async () => {
              const isDisplayed = await groupPage.owesYouAmount.isDisplayed();
              expect(isDisplayed).toBe(true);
            });

            it('should display the "Settle Up" button', async () => {
              const isDisplayed = await groupPage.settleUpButton.isDisplayed();
              expect(isDisplayed).toBe(true);
            });
          });
        });
      });
    });
  });
});
