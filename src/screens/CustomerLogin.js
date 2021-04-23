import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import { CustomerLoginContext } from "../components/context/CustomerLoginContext";
import CustomerLoginButtons from "../components/CustomerLoginButtons";
import CustomerLoginEmail from "../components/CustomerLoginEmail";
import CustomerLoginPhone from "../components/CustomerLoginPhone";
import styles from "../styles/SellerLoginStyles";
import { AuthContext } from "../components/context/Store";
import * as Google from "expo-google-app-auth";
import { firebase } from "../helper/FirebaseConfig";

const CustomerLogin = ({ navigation }) => {
    const initialState = {
        isEmailLogin: false,
        isPhoneLogin: false,
    };

    const { startLoading, stopLoading, signIn } = React.useContext(AuthContext);

    const onSignIn = (googleUser) => {
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();

            if (!isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then((response) => {
                        stopLoading();
                        signIn(response.user.uid, response.user.displayName);
                    })
                    .catch((error) => {
                        stopLoading();
                        alert(error);
                    });
            } else {
                alert("User already logged in!");
                stopLoading();
                firebase
                    .auth()
                    .signOut()
                    .then(() => console.log("User logged out!"));
            }
        });
    };

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerId ===
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    const StateReducer = (prevState, action) => {
        switch (action.type) {
            case "EMAIL_LOGIN":
                return {
                    ...prevState,
                    isEmailLogin: true,
                    isPhoneLogin: false,
                };
            case "PHONE_LOGIN":
                return {
                    ...prevState,
                    isEmailLogin: false,
                    isPhoneLogin: true,
                };
            case "GO_BACK":
                return {
                    ...prevState,
                    isEmailLogin: false,
                    isPhoneLogin: false,
                };
        }
    };

    const [State, dispatch] = React.useReducer(StateReducer, initialState);

    const authContext = React.useMemo(
        () => ({
            emailLogin: async () => {
                dispatch({ type: "EMAIL_LOGIN" });
            },
            phoneLogin: async () => {
                dispatch({ type: "PHONE_LOGIN" });
            },
            goBack: async () => {
                dispatch({ type: "GO_BACK" });
            },
            signInWithGoogle: async () => {
                startLoading();
                try {
                    const result = await Google.logInAsync({
                        androidClientId:
                            "946405576296-slbcrpbfg00sru0qqjdg9tugofp7n5v1.apps.googleusercontent.com",
                        // iosClientId: YOUR_CLIENT_ID_HERE,

                        scopes: ["profile", "email"],
                    });

                    if (result.type === "success") {
                        onSignIn(result);
                        return result.accessToken;
                    } else {
                        return { cancelled: true };
                    }
                } catch (e) {
                    stopLoading();
                    alert(e);
                }
            },
        }),
        []
    );
    return (
        <CustomerLoginContext.Provider value={authContext}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.container}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={["#2E2E2E", "#000000"]}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Animatable.View animation="fadeIn">
                            <FontAwesome
                                name="arrow-circle-left"
                                color="#fff"
                                size={30}
                                style={{ marginLeft: 20, marginTop: 20 }}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                </LinearGradient>
                <View>
                    <Animatable.View animation="fadeInLeftBig" duration={1500}>
                        <Text style={styles.headerText}>Customer Login</Text>
                        <Text style={[styles.headerTextMini, { fontSize: 24 }]}>
                            Welcome Back!
                        </Text>
                    </Animatable.View>
                </View>
                <Animatable.View
                    animation="fadeInRightBig"
                    duration={1500}
                    style={[
                        styles.footer,
                        {
                            backgroundColor: "#fff",
                        },
                    ]}
                >
                    {State.isEmailLogin ? (
                        <CustomerLoginEmail data={navigation} />
                    ) : State.isPhoneLogin ? (
                        <CustomerLoginPhone data={navigation} />
                    ) : (
                        <CustomerLoginButtons data={navigation} />
                    )}
                </Animatable.View>
            </View>
        </CustomerLoginContext.Provider>
    );
};

export default CustomerLogin;
