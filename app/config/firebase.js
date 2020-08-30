import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBP5LsQh_qyfwycfpwnR1s0tA5hPCRbDl8",
  authDomain: "musicappdb-c6547.firebaseapp.com",
  databaseURL: "https://musicappdb-c6547.firebaseio.com",
  projectId: "musicappdb-c6547",
  storageBucket: "musicappdb-c6547.appspot.com",
  messagingSenderId: "1059906495041",
  appId: "1:1059906495041:web:51b877566abbad274bdcc0",
  measurementId: "G-XC0J5MQGCX"
};
async function initFireBase () {
  try {
      await firebase.initializeApp(firebaseConfig)
  }
  catch(e) {
      console.log(`error + ${e}`)
  }
}
// initFirebase
initFireBase();

export { firebase };