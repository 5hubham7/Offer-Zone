const firebase = require("firebase");
const config = require("./config.json");
const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
};
firebase.initializeApp(firebaseConfig);

firebase.default.firestore().settings(settings);

module.exports = firebase;
