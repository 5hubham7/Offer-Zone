import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import * as Google from "expo-google-app-auth";

import { AuthContext } from "../components/context/Store";
import { firebase } from "../helper/FirebaseConfig";
import styles from "../styles/SellerSignupStyles";
import SellerSignupEmail from "../components/SellerSignupEmail";

const SellerSignup = ({ navigation }) => {
    const [SignUp, setSignUp] = useState({
        isEmail: false,
    });

    const handelSignUpEmail = () => {
        setSignUp({ ...SignUp, isEmail: true });
    };

    const { startLoading, stopLoading } = React.useContext(AuthContext);

    const SignUpWithGoogle = async () => {
        startLoading();
        try {
            const result = await Google.logInAsync({
                androidClientId:
                    "946405576296-slbcrpbfg00sru0qqjdg9tugofp7n5v1.apps.googleusercontent.com",
                // iosClientId: YOUR_CLIENT_ID_HERE,

                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                stopLoading();
                const SignUpViaMethod = "Google";
                navigation.navigate("SellerSignupDetails", {
                    result,
                    SignUpViaMethod,
                });
            } else {
                stopLoading();
                alert("Google Sign Up Failed ! Please Try Again Later.");
                return { cancelled: true };
            }
        } catch (err) {
            stopLoading();
            alert(err.message);
        }
    };

    const onSignUp = (googleUser) => {
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );

            firebase
                .auth()
                .signInWithCredential(credential)
                .then((response) => {
                    stopLoading();
                    navigation.navigate("SellerSignupDetails", {
                        uid: response.user.uid,
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                });
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
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
            <View style={styles.header}>
                <Animatable.View animation="fadeInDownBig" duration={1500}>
                    <Text style={styles.headerText}>Seller Signup</Text>
                </Animatable.View>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                duration={1500}
                style={[
                    styles.footer,
                    {
                        backgroundColor: "#fff",
                    },
                ]}
            >
                {SignUp.isEmail == false ? (
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    handelSignUpEmail();
                                }}
                            >
                                <LinearGradient
                                    colors={["#00BEF6", "#018CF0", "#0054E9"]}
                                    style={[styles.signupButtonBG]}
                                >
                                    <Text style={styles.signupButtonText}>
                                        <FontAwesome
                                            name="envelope-open"
                                            color="#fff"
                                            size={20}
                                        />
                                        {"  "}Sign Up with Email
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => SignUpWithGoogle()}
                            >
                                <LinearGradient
                                    colors={["#DE7F00", "#CF2600", "#C50000"]}
                                    style={[styles.signupButtonBG]}
                                >
                                    <Text style={styles.signupButtonText}>
                                        <FontAwesome
                                            name="google"
                                            color="#fff"
                                            size={20}
                                        />
                                        {"  "}Sign Up with Google
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.loginText, { marginLeft: 20 }]}>
                            <Text style={styles.loginTextColor}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("SellerLogin")
                                }
                            >
                                <Text
                                    style={[
                                        styles.loginTextColor,
                                        { fontWeight: "bold", width: 100 },
                                    ]}
                                >
                                    {" "}
                                    Log In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <SellerSignupEmail data={navigation} />
                )}
            </Animatable.View>
        </View>
    );
};

export default SellerSignup;
