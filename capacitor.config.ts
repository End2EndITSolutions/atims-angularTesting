import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.testbed.mihai',
  appName: 'AngularTest',
  webDir: 'dist/angular-test/browser',
  plugins:{
    SplashScreen:{
      androidSplashResourceName: "splash",
      androidScaleType: "FIT_CENTER",
      showSpinner: true,
      androidSpinnerStyle: "horizontal",
      iosSpinnerStyle: "small",
      spinnerColor: "#40ff00",
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launch_screen",
      useDialog: false,
    }
  },
  android: {
    allowMixedContent: true
  },
  server: {
    cleartext: true,
    hostname: "localhost"
  }
};

export default config;
