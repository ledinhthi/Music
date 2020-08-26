var express = require('express');
var router = express.Router();
var fireBase = require('firebase')
var fireBaseAmin = require('firebase-admin')
// fireBaseAdmin = fireBase
// init firebase
const serviceAccount = require('../common/MusicKey.json');
fireBaseAmin.initializeApp({
  credential: fireBaseAmin.credential.cert(serviceAccount)
});

const db = fireBaseAmin.firestore();
if (db == null) {
    console.log("db is null")
}

const getList = async function () {
    const value =  await db.collection('Users').doc('UserID').get()
    return value
}
const list = getList()
list.then((object) => {
    console.log( object._fieldsProto.Email.stringValue);  
})
.catch(error => {
    console.log(`error`)
})

 //Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define the home page route
router.get('/', function(req, res) {
  res.send('home page');
});

// Define the about route
router.get('/about', function(req, res) {
  res.send('About us');
});


module.exports = router;