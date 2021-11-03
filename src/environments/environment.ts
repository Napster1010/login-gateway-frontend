// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  REGISTRATION_API: {
    GENERATE_OTP: 'http://localhost:8080/registration/new',
    FINALIZE: 'http://localhost:8080/registration/finalize'
  },
  LOGIN_API: 'http://localhost:8080/auth/login/',
  LOGOUT_API: 'http://localhost:8080/auth/logout/',
  USER_API: 'http://localhost:8080/user/',
  USER_APPS_API: 'http://localhost:8080/user-app-mapping/apps/',
  UPDATE_APP_NAVIGATION_ACTIVITY_API: 'http://localhost:8080/user-activity-log/',
  SESSION_TIME: 4.5
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
