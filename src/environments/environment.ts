import { firebaseConfig } from "./firebase.config";

export const environment = {
  version: require('../../package.json').version,
  firebaseConfig: firebaseConfig,
  production: true,
};
