# Fave Money — Automation Suite (TypeScript · WebdriverIO · Appium · BrowserStack)

Black-box automation suite for the Onboarding & Groups experience — runs locally against an Android emulator, or on real devices via BrowserStack App Automate.

## Why this stack

- **Appium (black-box) over Flutter's `integration_test`**: this exercises the compiled `app-debug.apk` the way a real user's device runs it, with zero test instrumentation baked into the app binary. That separation between test code and app code matters most for exactly this kind of exercise — auditing a build I didn't write.
- **TypeScript + WebdriverIO**: strong typing on page objects catches locator/method mistakes at compile time (`npm run typecheck`), and WDIO's service model made BrowserStack integration a config swap (`wdio.local.conf.ts` → `wdio.browserstack.conf.ts`) rather than a rewrite.
- **Page Object Model**: every screen is a class exposing behavior (`selectGroup(...)`, `setPaidTo()`) and UI Element getters (`payAnyoneButton()`, `settleUpButton()`), , not raw selectors — once real locators are wired in, test logic doesn't change.
- **BrowserStack App Automate**: covers real-device/Android-fragmentation testing without maintaining a device lab — configurable device/OS matrix in `wdio.browserstack.conf.ts`.

## What's covered

| Area | File(s) | Why it's here |
|---|---|---|
| Onboarding flow | `onboarding-test.spec.ts` | End-To-End onboarding happy path present in `src/test/specs/onboarding-test.spec.ts` (locators and some waits may still need tuning). |
| Smoke test — Groups & Transactions | `group-and-transaction-smoke.spec.ts` | Scaffolded smoke flow in `src/test/specs/group-and-transaction-smoke.spec.ts` covering group creation → add member → add transaction → split screen. |

## Setup & run — locally

```bash
# Install dependencies
npm install

# Terminal 1 — start Appium (use npx if Appium isn't installed globally)
npx appium

# Run tests against an emulator / real device (set device and app path in .env file "DEVICE_NAME=emulator-5554 APP_PATH=./app-debug.apk")
# Log in manually once on this emulator first, if device does not have sim.  
npm run test:local
```

## Setup & run — BrowserStack

```bash
# One-time app upload — the API returns an `app_url` (copy this value):
curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@./app-debug.apk"

# Then run the suite using the returned app id (example):
BROWSERSTACK_USERNAME=your_user \
BROWSERSTACK_ACCESS_KEY=your_key \
BROWSERSTACK_APP_ID=bs://<returned-app-id> \
  npm run test:browserstack
```

Device selection lives in `wdio.browserstack.conf.ts` (`bstack:options`). Prefer a real device with telephony/SIM if you want automated OTP capture — `src/utils/sim-utils.ts` reads SMS via `mobile: listSms` when available.

## OTP & session — the one real gap

Both local and BrowserStack runs assume login is already done if device has no sim card — `ensureLoggedIn()` in `src/utils/login-flow.ts` verifies session state rather than automating OTP entry, since OTP arrives via real SMS from the server.

- **SIM-enabled devices (automated OTP)**: If the device/emulator exposes SMS (has a SIM or supports `mobile: listSms`), the suite will attempt to read the OTP automatically via `src/utils/sim-utils.ts` (`SimUtils.getOTPFromNotification()`). Local emulators or real devices that expose SMS to Appium usually work with this approach.
- **No-SIM / cloud devices (manual OTP)**: If the device does not expose SMS (common for fresh cloud devices or some BrowserStack configurations), automated OTP won't work and you'll need to log in manually on the device before running the suite.

## What I'd add next

1. **Reporting & artifacts** — Add Allure reporting, capture screenshots/video on failure, and upload CI artifacts for each run.

2. **POM refactor** — Split large page objects into reusable components (for example: `Transaction`, `AddPerson`, `OnboardingHero`) and centralize locator constants.

3. **CI automation (BrowserStack)** — Add a GitHub Actions workflow to upload the app, set `BROWSERSTACK_APP_ID`, run the suite, and persist artifacts. Ensure `BROWSERSTACK_*` secrets are configured.

4. **Visual regression** — Integrate Percy (or a similar tool) to capture and compare screenshots of critical screens (split/transaction flows).

5. **Device matrix & SIM strategy** — Expand `wdio.browserstack.conf.ts` to cover multiple Android versions and a small-screen device; designate SIM-capable devices or a fallback to ensure OTP automation works in CI.

6. **Stability & parallelism** — Configure controlled `maxInstances`, add flaky-test retries, and isolate fixtures to enable safe parallel execution.

7. **Base helpers & wait strategy** — Harden `BasePage` with helpers like `clickWhenReady()` and `safeSetValue()`, plus configurable wait/polling strategies to reduce flakiness.

8. **Test data & deterministic fixtures** — Add seeded test accounts, stable IDs and setup/teardown helpers to make tests reproducible.

9. **Locator hygiene & validation** — Add `LOCATORS.md` with Appium Inspector guidance and add a CI smoke-check script that validates selectors early.

10. **Quality tooling** — Add `eslint` + `prettier`, `npm run lint`, and run typecheck + lint as part of CI.

11. **Convenience scripts** — Add npm scripts for one-step app upload, a local-login helper, and `prepare-emulator` (install APK, grant permissions, confirm `adb devices`).

12. **Test organization & coverage** — Add placeholder regression specs, tag tests (`@smoke`, `@regression`) and include a `CONTRIBUTING.md` describing how to add tests.

13. **Observability** — Persist BrowserStack session logs, device logs and Appium server logs to CI artifacts for faster triage.

14. **Network & auth strategies** — Evaluate a staging auth bypass or an SMS-capture sink (Twilio-like) to avoid manual OTPs in BrowserStack CI runs.
