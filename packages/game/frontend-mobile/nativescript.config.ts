import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.frontendmobile',
  appPath: 'src',
  appResourcesPath: 'resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
} as NativeScriptConfig;
