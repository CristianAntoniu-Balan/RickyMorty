import * as error from '../config/stringsError';

const baseLoginURL = 'http://localhost:1337/';
// fake-token-api
// https://github.com/testdrivenio/fake-token-api.git

// TODO getLoginStatus -> checkToken & expiryTime
// TODO register ?
// TODO logIn -> getToken & setExpiryTime

// export const getLoginStatus = fetch(baseLoginURL + 'status')
//    .then((res) => res.json())
//    .then((data) => {
//       if (data.status === 'error') {
//          console.log('error log in');
//          throw new Error('not logged in');
//       } else {
//          console.log('logged in ok');
//          return 'ok';
//       }
//    })
//    .catch(() => {
//       throw new Error('some otter log in error');
//    });

// let requestHeaders = new Headers();
// requestHeaders.append('Content-Type', 'application/json');

// export const getLoginStatus = () => true;

export async function logInAsync(data) {
   const myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
   };

   let loginResponse = null;

   await fetch(baseLoginURL + 'login', requestOptions)
      .then((res) => res.json())
      .then((data) => {
         if (data.status === 'success') {
            loginResponse = data.token;
         } else {
            throw new Error(error.logInGenericError);
         }
      })
      .catch(() => {
         throw new Error(error.logInGenericError);
      });
   return loginResponse;
}

export async function isLoginValid() {
   const sessionLogInData = JSON.parse(sessionStorage.getItem('logInData'));
   const checkStorage =
      (sessionLogInData?.token && sessionLogInData?.expiresAt > Date.now()) ||
      false;

   const myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   myHeaders.append('Authorization', `Token ${sessionLogInData?.token}`);

   const requestOptions = {
      headers: myHeaders,
   };

   let checkServer = false;

   checkStorage &&
      (await fetch(baseLoginURL + 'status', requestOptions)
         .then((res) => res.json())
         .then((data) => {
            if (data.status === 'success') {
               checkServer = true;
            } else {
               throw new Error('error checking login credentials');
            }
         })
         .catch(() => {
            throw new Error('error checking login credentials');
         }));

   return checkServer & checkStorage;
}
