import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import * as Google from "expo-google-app-auth";

import { firebase } from "../helper/FirebaseConfig";
import { AuthContext } from "./context/Store";
import styles from "../styles/SignupStyles";

const SignupEmail = (navigation) => {
    //state to store user credential like email ,password
    const [userDetails, setuserDetails] = useState({
        email: "",
        password: "",
    });

    //state to store trigger
    const [Trigger, setTrigger] = useState({
        isValidEmail: false,
        isPasswordError: false,
        showPassword: true,
        showConfirmPassword: true,
        isError: false,
        errorMessage: "",
        errorPasswordMessage: "",
        isLoading: false,
    });

    //get functions which is stote in store i.e context
    const { startLoading, stopLoading } = React.useContext(AuthContext);

    /*************** SignUp With Email Handel Part **************/

    const handelEmailChange = (text) => {
        //console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            //alert("Email is Not Correct");
            setTrigger({ ...Trigger, isValidEmail: false });
        } else {
            setTrigger({ ...Trigger, isValidEmail: true });
            setuserDetails({
                ...userDetails,
                email: text,
            });
            //alert("Email is Correct");
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setuserDetails({
                ...userDetails,
                password: val,
            });
            setTrigger({
                ...Trigger,
                isPasswordError: false,
                errorPasswordMessage: "",
            });
        } else {
            setTrigger({
                ...Trigger,
                isPasswordError: true,
                errorPasswordMessage: "Password Must be 8 or more charector",
            });
        }
    };

    const updateShowPassword = () => {
        setTrigger({ ...Trigger, showPassword: !Trigger.showPassword });
        //console.log(userDetails)
    };

    const handleConfirmPasswordChange = (val) => {
        if (userDetails.password != val) {
            setTrigger({
                ...Trigger,
                isError: true,
                errorMessage: "Password Not Match",
            });
        } else {
            setTrigger({
                ...Trigger,
                isError: false,
                errorMessage: "",
            });
        }
    };

    const updateShowConfirmPassword = () => {
        setTrigger({
            ...Trigger,
            showConfirmPassword: !Trigger.showConfirmPassword,
        });
        //console.log(userDetails)
    };

    const onContinuePress = async (email, password) => {
        const userCredential = {
            email: email,
            password: password,
        };
        const SignUpViaMethod = "Email";
        startLoading();
        navigation.data.navigate("SignupDetails", {
            userCredential,
            SignUpViaMethod,
        });
        stopLoading();
    };

    /*************** SignUp With Google Handel Part **************/

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
                //console.log(result)
                onSignUp(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };

    const onSignUp = (googleUser) => {
        //console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );

            // Sign in with credential from the Google user.
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((response) => {
                    stopLoading();
                    //console.log(response.user.uid)
                    navigation.data.navigate("SignUpDetails", {
                        uid: response.user.uid,
                    });

                    //signIn(response.user.uid, response.user.displayName)
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
        });
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animatable.View animation="bounceIn" duration={1500}>
                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) => handelEmailChange(val)}
                            />
                            <TouchableOpacity
                            //onPress={updateSecureTextEntry}
                            >
                                {Trigger.isValidEmail ? (
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                        style={{ marginRight: 30 }}
                                    />
                                ) : null}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#666666"
                                secureTextEntry={
                                    Trigger.showPassword ? true : false
                                }
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handlePasswordChange(val)
                                }
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    updateShowPassword();
                                }}
                            >
                                {Trigger.showPassword ? (
                                    <FontAwesome
                                        name="eye-slash"
                                        color="grey"
                                        size={20}
                                        style={{ marginRight: 30 }}
                                    />
                                ) : (
                                    <FontAwesome
                                        name="eye"
                                        color="grey"
                                        size={20}
                                        style={{ marginRight: 30 }}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        {Trigger.isPasswordError ? (
                            <Text style={styles.errorMessage}>
                                {Trigger.errorPasswordMessage}
                            </Text>
                        ) : null}
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#666666"
                                secureTextEntry={
                                    Trigger.showConfirmPassword ? true : false
                                }
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handleConfirmPasswordChange(val)
                                }
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    updateShowConfirmPassword();
                                }}
                            >
                                {Trigger.showConfirmPassword ? (
                                    <FontAwesome
                                        name="eye-slash"
                                        color="grey"
                                        size={20}
                                        style={{ marginRight: 30 }}
                                    />
                                ) : (
                                    <FontAwesome
                                        name="eye"
                                        color="grey"
                                        size={20}
                                        style={{ marginRight: 30 }}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        {Trigger.isError ? (
                            <Text style={styles.errorMessage}>
                                {Trigger.errorMessage}
                            </Text>
                        ) : null}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                onContinuePress(
                                    userDetails.email,
                                    userDetails.password
                                );
                            }}
                        >
                            <LinearGradient
                                colors={["#00BEF6", "#018CF0", "#0054E9"]}
                                style={[styles.signupButtonBG]}
                            >
                                <Text style={styles.signupButtonText}>
                                    <FontAwesome
                                        name="arrow-right"
                                        color="#fff"
                                        size={20}
                                    />
                                    {"  "}
                                    Continue
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SignUpWithGoogle()}>
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
                                    {"  "}
                                    Sign Up with Google
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.loginText,
                            { marginLeft: 20, alignItems: "center" },
                        ]}
                    >
                        <Text style={styles.loginTextColor}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.data.navigate("Login")}
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
                </Animatable.View>
            </ScrollView>
        </View>
    );
};

export default SignupEmail;
