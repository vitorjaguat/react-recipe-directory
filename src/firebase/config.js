import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBQzAksGcSAbgR9i9a0WNJFdSi33EJKBLQ',
  authDomain: 'react-recipe-directory-d6466.firebaseapp.com',
  projectId: 'react-recipe-directory-d6466',
  storageBucket: 'react-recipe-directory-d6466.appspot.com',
  messagingSenderId: '118388807863',
  appId: '1:118388807863:web:af0ed816296554ad649532',
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
