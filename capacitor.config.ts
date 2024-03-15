import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.librarysystem.inventory',
  appName: 'Library Inventory System',
  webDir: 'dist/flexy-angular',
  server: {
    androidScheme: 'http'
  }
};

export default config;
