import firebase from '../lib/firebase'
import 'firebase/firebase-storage'

export interface event {
  id: string,
  addTimestamp: firebase.firestore.FieldValue,
  updateTimestamp: firebase.firestore.FieldValue,
  title: string,
  constraint: string,
  start: string
}