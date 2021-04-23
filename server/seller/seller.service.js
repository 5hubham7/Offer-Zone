const firebase = require("../firebaseConfig");
const db = firebase.default.firestore();

module.exports = { signup: signup, login: login };

let captcha = new firebase.auth.RecaptchaVerifier("sign-in-button", {
    size: "invisible",
    callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
    },
});

async function login(params) {
    await firebase
        .auth()
        .signInWithEmailAndPassword(params.email, params.password)
        .then(() => {
            let confirmation = firebase.default
                .auth()
                .signInWithPhoneNumber("+918407969492", captcha);
            console.log(confirmation);
            console.log("Login Successful!");
        });

    let user = await firebase.auth().currentUser;
    let uid;

    if (user !== "") {
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

            let sellerData = {
                id: uid,
                name: params.name,
                email: params.email,
                phone: params.phone,
                state: params.state,
                district: params.district,
                stores: params.stores,
            };

            db.collection("seller")
                .doc(uid)
                .set(JSON.parse(JSON.stringify(sellerData)))
                .then(() => {
                    userData = sellerData;
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
