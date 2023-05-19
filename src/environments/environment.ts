// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBasePath: 'https://localhost:7195/',
  recaptcha: {
    siteKey: '6LcbUR0mAAAAAIlUyFQ6P8AqW-Ceok62EyUjYkB1',
    secretKey: '6LcbUR0mAAAAAIKTAIBtL8kmcltqKfA-g-qaV2mw'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
