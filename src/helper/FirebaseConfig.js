import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzx4aZ64zF4Ocicz_fluGCb5zrLwrOtqU",
    authDomain: "offeer-zone.firebaseapp.com",
    databaseURL: "https://offeer-zone-default-rtdb.firebaseio.com",
    projectId: "offeer-zone",
    storageBucket: "offeer-zone.appspot.com",
    messagingSenderId: "946405576296",
    appId: "1:946405576296:web:801d05fd337ac8e4f3b5dd",
    measurementId: "G-J3L3F4N1BX",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
