import type { Options } from '@wdio/types';
import { sharedConfig } from './wdio.shared.conf';

// Required: BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_APP_ID
// See README "BrowserStack setup" for how BROWSERSTACK_APP_ID is obtained (one-time
// app upload via BrowserStack's REST API before the first run).
export const config: Options.Testrunner = {
  ...sharedConfig,
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  connectionRetryTimeout: 300000, // 5 minutes
  connectionRetryCount: 3,
  hostname: 'hub.browserstack.com',
  services: [
    [
      'browserstack',
      {
        app: process.env.BROWSERSTACK_APP_ID,
        browserstackLocal: false, // flip to true only if staging requires a local tunnel
      },
    ],
  ],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'bstack:options': {
        'enableSim' : 'true',
        'interactiveDebugging': 'true',
        'debug' : 'true',
        'simOptions' : {
          'region' : 'India',
        },
        deviceName: process.env.BS_DEVICE || 'Samsung Galaxy S23',
        osVersion: process.env.BS_OS_VERSION || '13.0',
        projectName: 'MS Team Homes & Groups',
        buildName: `QA regression build ${new Date().toISOString()}`,
        sessionName: 'Homes & Groups automation suite'
      },
    },
  ],
};
