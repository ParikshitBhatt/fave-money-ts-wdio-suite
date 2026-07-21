import type { Options } from '@wdio/types';
import { sharedConfig } from './wdio.shared.conf';
import path from 'path';

export const config: Options.Testrunner = {
  ...sharedConfig,
  runner: 'local',
  port: 4723,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.DEVICE_NAME || 'emulator-5554',
      'appium:app': process.env.APP_PATH || path.resolve(__dirname, './app-debug.apk'),
      // Keep app data between runs — full reinstall re-triggers UPI device binding,
      // which the brief says is rate-limited to 3x/24h. See top-level README.
      'appium:noReset': true,
      'appium:autoGrantPermissions': true,
    },
  ],
  services: ['appium'],
};
