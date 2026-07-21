# Fave — Homes & Groups Bug Report

**Tester:** Parikshit Bhatt · **Build:** app-debug.apk · **Device:** Samsung Galaxy S23· **Platform:** Android · **Date:** 20 July 2026

---

## How to read this doc

Each entry follows the brief's required fields exactly: title, screen/area, steps to reproduce
(exact inputs), expected vs. actual, severity + reasoning, evidence.

**Severity guide** (state your reasoning per-bug, don't just tag it):
- **Critical** — money is silently wrong (miscalculated split, lost/invented balance, wrong settle-up amount). No workaround, or the user wouldn't even notice it happened.
- **High** — money-adjacent but recoverable or visible (blocks a flow entirely, but doesn't silently corrupt data).
- **Medium** — functional but wrong (bad state handling, confusing UX that could lead to user error).
- **Low** — cosmetic, visual deviation from Figma with no functional impact.

---

## BUG-001

**Title:** Already-added group members remain selectable/tappable in the Contacts picker — no "already in group" state shown

**Severity:** Low — *reasoning: the contact's profile stays clickable and appears selectable. This is a UI affordance gap, not a data-integrity bug: the picker should visually lock/grey out/checkmark contacts already in the group instead of leaving them looking tappable with no visible effect when tapped.*

**Screen/Area:** Add/invite member flow — Contacts picker, within a Group

**Steps to reproduce:**
1. Open a group that already has at least one member
2. Go to the add-member flow → Contacts list
3. Tap/select a contact who is already a member of this group
4. Observe the row remains tappable/selectable, with no "already added" indicator
5. Confirm the group's member list is unchanged afterward — no duplicate entry is created

**Expected behaviour:** A contact already in the group should show a disabled/greyed/checked "already in group" state and not be selectable again.

**Actual behaviour:** The contact's profile stays fully clickable, as if not yet a member — even though selecting it has no effect on the actual member list.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-user-is-able-add-same-user-in-group-again-and-again-without-error.mov" type="video/mp4">
</video>
[Video Link]("./bug-evidences/bug-evidences/fave-money-bug-user-is-able-add-same-user-in-group-again-and-again-without-error.mov")
---

## BUG-002

**Title:** Group/home member count displayed does not match actual member list

**Severity:** High — *reasoning: this is a trust-in-the-numbers bug for a product whose entire pitch is "know what you owe."*

**Screen/Area:** Home overview screen

**Steps to reproduce:**
1. Open a Home
2. Compare the member count shown on the overview card against the actual member list

**Expected behaviour:** Displayed count matches the real number of distinct members.

**Actual behaviour:** Count shown is incremented by 1 over the actual member count.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-incorrect-home-member-count.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-bug-incorrect-home-member-count.mov)
---

## BUG-003

**Title:** Unable to edit an existing transaction within a Home

**Severity:** High — *reasoning: mistakes in amount/description are inevitable; if there's no way to correct a transaction after the fact, users are stuck either living with a wrong balance or deleting-and-recreating (which itself risks losing split history). Directly blocks a money-correction path.*

**Screen/Area:** Transaction detail (Home context)

**Steps to reproduce:**
1. Open an existing transaction inside a Home
2. Attempt to edit any input field — Amount, Paid To, or Tag

**Expected behaviour:** Transaction edits save and update the changes accordingly.

**Actual behaviour:** Edit does not take effect.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-user-is-unable-to-edit-transection-home.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-bug-user-is-unable-to-edit-transection-home.mov)
---

## BUG-004

**Title:** Transaction type cannot be updated within a Group

**Severity:** High — *reasoning: mistakes in type are inevitable; if there's no way to correct a transaction's type after the fact, users are stuck living with a wrong type or deleting-and-recreating (which risks losing split history). Directly blocks a money-correction path*

**Screen/Area:** Transaction edit (Group context)

**Steps to reproduce:**
1. Open/edit a transaction in a Group
2. Attempt to change its type

**Expected behaviour:** Selected type updates and persists.

**Actual behaviour:** Type does not update.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-user-is-unable-to-update-transaction-type-in_group.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-bug-user-is-unable-to-update-transaction-type-in_group.mov)
---

## BUG-005

**Title:** Username field accepts illegal/invalid characters

**Severity:** Medium — *reasoning: not a direct money bug, but unvalidated usernames can break downstream display (balance lines, notifications, search) or open the door to display-spoofing between group members — worth escalating if you find it also breaks a balance/settle-up screen's text rendering.*

**Screen/Area:** Profile / username edit (from onboarding page)

**Steps to reproduce:**
1. Open username edit field during onboarding
2. Enter special characters (e.g. `%$^&*()`)
3. Save

**Expected behaviour:** Invalid characters rejected with inline validation error.

**Actual behaviour:** Accepted and saved.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-supporting-illegal-characters-in-username.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-bug-supporting-illegal-characters-in-username.mov)
---

## BUG-006

**Title:** Bottom overflow (render overflow warning) on login page

**Severity:** Low — *reasoning: cosmetic. [Worth a final check: confirm it doesn't obscure the Continue/OTP button — if it does, this bumps to High since it'd block onboarding entirely.]*

**Screen/Area:** Login screen (OTP entry)

**Steps to reproduce:**
1. Open login screen, reach OTP entry step

**Expected behaviour:** No render overflow; layout adapts to screen/keyboard.

**Actual behaviour:** Bottom overflow warning strip visible.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-bottom-overflow-issue-on-login-page.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-bug-bottom-overflow-issue-on-login-page.mov)
---

## BUG-007

**Title:** Bottom overflow (render overflow warning) in group member remover UI

**Severity:** Low — *reasoning: cosmetic. [Worth a final check: confirm it doesn't cover the "Hold to remove" / "Don't remove" actions — if it does, this bumps to Medium/High since it risks a mis-tap on a destructive action.]*

**Screen/Area:** Group — remove member confirmation sheet

**Steps to reproduce:**
1. Open a group's member list (Manage Members)
2. Tap the overflow menu on a member and choose Remove

**Expected behaviour:** No render overflow.

**Actual behaviour:** Overflow warning visible at the bottom of the remove-member confirmation sheet.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-buttom-overflow-issue-in-group-member-remover.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-buttom-overflow-issue-in-group-member-remover.mov)
---

## BUG-008

**Title:** Edit home picture does not persist/apply

**Severity:** Medium — *reasoning: cosmetic/personalization feature, not money-critical, but a completely broken edit action (not just visually rough) is a real functional bug — confirmed it doesn't apply even after a reload, so it's not a caching/refresh issue, it's not saving at all.*

**Screen/Area:** Home settings — edit home picture

**Steps to reproduce:**
1. Open Home settings → Edit Picture
2. Select a new image via any option — Camera, Gallery, or Random Image
3. Save/confirm

**Expected behaviour:** New picture is saved and displayed, including after app reload.

**Actual behaviour:** Picture doesn't update — confirmed still broken even after reload.

**Evidence:** 
<video width="320" height="240" controls>
  <source src="./bug-evidences/bug-evidences/fave-money-bug-edit-home-picture-not-working.mov" type="video/mp4">
</video>
[Video Link](./bug-evidences/bug-evidences/fave-money-bug-edit-home-picture-not-working.mov)
---

## Figma deviations (visual/behavioural)

- Bottom overflow (render warning) appears in multiple places beyond BUG-006/007 — also observed on the QR page and OTP page.

<img src="/bug-evidences/Otp%20Page%20bottom%20overflow.png" width="50%">
<img src="/bug-evidences/QR%20Page%20bottom%20over%20flow.png" width="50%">
---

## Summary

**Severity breakdown:** 0 Critical · 3 High (BUG-002, BUG-003, BUG-004) · 2 Medium (BUG-005, BUG-008) · 3 Low (BUG-001, BUG-006, BUG-007)

**Top 3 highest-signal findings** (the ones I'd fix first if I only had time for 3):

1. **BUG-002 — Member count mismatch on the Home overview.** This is the first number a user sees when they open a Home, and it's wrong by a consistent off-by-one. For a product whose entire pitch is "know what you owe," a visibly wrong count on the landing screen undermines trust before the user even looks at a balance.

2. **BUG-003 — Can't edit a transaction.** Every other money-correction path (delete-and-recreate) is lossy or clunky. This blocks the single most common "I made a mistake" recovery action a user will need.

3. **BUG-004 — Can't update transaction type.** Same root problem as BUG-003 (the edit path is broken), and it's plausible both share one underlying cause in the transaction-edit flow — worth investigating together, which could mean one fix resolves both.
