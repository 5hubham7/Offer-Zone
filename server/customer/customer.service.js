const firebase = require("../firebaseConfig");
const db = firebase.default.firestore();

module.exports = { signup: signup, login: login };

async function login(params) {
    await firebase
        .auth()
        .signInWithEmailAndPassword(params.email, params.password)
        .then(() => {
            console.log("Login Successful!");
        });
    let user = await firebase.auth().currentUser;
    let uid;

    if (user != "") {
        uid = user.uid;
        console.log(uid);
    }
    return await user;
}

async function signup(params) {
    var userData = "";

    await firebase
        .auth()
        .createUserWithEmailAndPassword(params.email, params.password)
        .then(() => {
            let user = firebase.auth().currentUser;
            let uid;

            if (user != "") {
                uid = user.uid;
                console.log(uid);
            }

            let customerData = {
                id: uid,
                name: params.name,
                email: params.email,
                phone: params.phone,
                state: params.state,
                district: params.district,
                stores: params.stores,
            };

            db.collection("customer")
                .doc(uid)
                .set(JSON.parse(JSON.stringify(customerData)))
                .then(() => {
                    userData = customerData;
                })
                .catch((err) => {
                    throw err;
                });
        })
        .catch((err) => {
            throw err;
        });
    if (userData !== "") return userData;
}
