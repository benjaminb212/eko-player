import firebase from 'firebase';
const firebaseConfigStage = {
    apiKey: 'AIzaSyBA13tU21Yy6PthRGyVx2-1Rv3lsSgGbNQ',
    authDomain: 'eko-player-stage.firebaseapp.com',
    databaseURL: 'https://eko-player-stage-default-rtdb.firebaseio.com',
    projectId: 'eko-player-stage',
    storageBucket: 'eko-player-stage.appspot.com',
    messagingSenderId: '546911692911',
    appId: '1:546911692911:web:654ae5f3d03ecdbbca059a',
};
// const firebaseConfigProd = {
//     apiKey: 'AIzaSyBtUYQZL07jQb8Jb_tuux6h47d36gj04Bk',
//     authDomain: 'eko-player-17ec5.firebaseapp.com',
//     projectId: 'eko-player-17ec5',
//     storageBucket: 'eko-player-17ec5.appspot.com',
//     messagingSenderId: '999690120952',
//     appId: '1:999690120952:web:90602ba3ee48d1cb9d950d',
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfigStage);
export default firebase;
