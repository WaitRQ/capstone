import * as firebase from 'firebase'

const config = {
  apiKey: 'aAIzaSyCjDkUUA4b3fyNTMJIbcTwqC1vBWFOznqQ',
  authDomain: 'waitrq-ae81f.firebaseapp.com',
  databaseURL: 'https://waitrq-ae81f.firebaseio.com',
  storageBucket: 'bucket.appspot.com'
}

firebase.initializeApp(config)

const database = firebase.database()

export {database}
