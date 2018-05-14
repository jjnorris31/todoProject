import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCFjIvZBRlXImSAt7zhiVqA_4ZrSJ0uaIk",
  authDomain: "todo-2fa86.firebaseapp.com",
  databaseURL: "https://todo-2fa86.firebaseio.com",
  projectId: "todo-2fa86",
  storageBucket: "todo-2fa86.appspot.com",
  messagingSenderId: "529376585011"
}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore
