const firebase = require("../config");
const db = firebase.default.firestore();

module.exports = { signup: signup };

async function signup(params) {
    var userData = "";

    await firebase
        .auth()
        .createUserWithEmailAndPassword(params.email, params.password)
        .then(() => {
            console.log("created user!");

            let user = firebase.auth().currentUser;
            let uid;

            if (user != "") {
                uid = user.uid;
                console.log(uid);
            }

            firebase.auth().signOut();

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
