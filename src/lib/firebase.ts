import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCZ5JxkktT46Lh_baJu3IsNZcJkQ9-dzsk",
  authDomain: "huit-calendar.firebaseapp.com",
  databaseURL: "https://huit-calendar-default-rtdb.firebaseio.com",
  projectId: "huit-calendar",
  storageBucket: "huit-calendar.appspot.com",
  messagingSenderId: "505724746503",
  appId: "1:505724746503:web:6f35c07882c086e2d823a2",
  measurementId: "G-VN8JPQVHKR"
};

firebase.initializeApp(firebaseConfig)

export default firebase