// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backUrl: 'http://13.36.9.109:5000',
/* backUrl: 'http://ec2-35-180-36-32.eu-west-3.compute.amazonaws.com:5000' */
  firebase: {
    apiKey: "AIzaSyDh01DW1q5a-0TeQIJp0g8Lx8AEFUF4G4I",
    authDomain: "chatangulardev.firebaseapp.com",
    databaseURL: "https://chatangulardev.firebaseio.com",
    projectId: "chatangulardev",
    storageBucket: "chatangulardev.appspot.com",
    messagingSenderId: "224527952300",
    appId: "1:224527952300:web:a0382a68219780082c7209"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
