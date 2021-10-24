// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import 'firebase/compat/auth';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDD6XcfCU2z_LNgIRRlI29oZ6fnSA7RPTc',
    authDomain: 'chat-with-me-ba33a.firebaseapp.com',
    databaseURL:
        'https://chat-with-me-ba33a-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'chat-with-me-ba33a',
    storageBucket: 'chat-with-me-ba33a.appspot.com',
    messagingSenderId: '244453536222',
    appId: '1:244453536222:web:c699a812590a63fffcad4f',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.database();
