import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBTz0aelz92G60GOknLuS9S0FruTix5jK8",
    authDomain: "crwn-db-79f53.firebaseapp.com",
    databaseURL: "https://crwn-db-79f53.firebaseio.com",
    projectId: "crwn-db-79f53",
    storageBucket: "crwn-db-79f53.appspot.com",
    messagingSenderId: "584716018126",
    appId: "1:584716018126:web:a38ab65d7b98c0a1510b9f",
    measurementId: "G-64G3914L0P"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase