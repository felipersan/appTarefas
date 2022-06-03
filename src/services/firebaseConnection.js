import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBLE1zWRYPMlE8ZA3sYJn5EygLZIaImOic',
  authDomain: 'tarefas-f69bb.firebaseapp.com',
  projectId: 'tarefas-f69bb',
  storageBucket: 'tarefas-f69bb.appspot.com',
  messagingSenderId: '58579709747',
  appId: '1:58579709747:web:ad5b7d8cfaea216fd25846',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
