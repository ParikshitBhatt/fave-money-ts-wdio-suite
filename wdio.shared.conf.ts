import type { Options } from '@wdio/types';

export const sharedConfig: Partial<Options.Testrunner> = {
  specs: ['./src/test/specs/**/onboarding-test.spec.ts'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
  },
  reporters: ['spec'],
  logLevel: 'info',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
};
