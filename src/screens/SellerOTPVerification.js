import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import axios from "axios";

import { AuthContext } from "../components/context/Store";
import { verificationContext } from "../components/context/VerificationContext";
import SellerOTPInputBox from "../components/OTPInputBox";
import TimerText from "../components/TimerText";
import axiosURL from "../helper/AxiosURL";
import styles from "../styles/SellerOTPVerificationStyles";

const RESEND_OTP_TIME_LIMIT = 60; // 30 secs
let resendOtpTimerInterval;

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
try {
    firebase.initializeApp({
        apiKey: "AIzaSyCzx4aZ64zF4Ocicz_fluGCb5zrLwrOtqU",
        authDomain: "offeer-zone.firebaseapp.com",
        databaseURL: "https://offeer-zone-default-rtdb.firebaseio.com",
        projectId: "offeer-zone",
        storageBucket: "offeer-zone.appspot.com",
        messagingSenderId: "946405576296",
        appId: "1:946405576296:web:801d05fd337ac8e4f3b5dd",
        measurementId: "G-J3L3F4N1BX",
    });
} catch (err) {
    // ignore app already initialized error in snack
}

const SellerOTPVerification = ({ navigation, route }) => {
    // in secs, if value is greater than 0 then button will be disabled
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT
    );

    const { startLoading, stopLoading, signIn, signUp } = React.useContext(
        AuthContext
    );

    // useEffect(() => {
    //     console.log("SellerOTPVerification", route)
    // }, [])
    const [AutoOTPEnter, setAutoOTPEnter] = useState(false);
    const [verificationCode, setVerificationCode] = React.useState();
    const [verificationId, setVerificationId] = React.useState(route.params.Id);
    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = firebase.apps.length
        ? firebase.app().options
        : undefined;

    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };

    const onResendOtpButtonPress = async () => {
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                route.params.SellerData.phone,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            alert("Verification code has been sent to your phone.");
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const authContext = React.useMemo(
        () => ({
            verifyOTP: async (verificationCode) => {
                //console.log("verificationCode", verificationCode)
                try {
                    const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        verificationCode
                    );
                    const user = await firebase
                        .auth()
                        .signInWithCredential(credential);
                    alert("Phone authentication successful 👍");
                } catch (err) {
                    alert(`Error: ${err.message}`);
                }
            },
            setOTP: async (verificationCode) => {
                //console.log("verificationCode", verificationCode)
                setVerificationCode(verificationCode);
            },
        }),
        []
    );

    const onVerifyOTPPress = async () => {
        startLoading();
        if (route.params.method === "Signup") {
            if (route.params.SignUpViaMethod === "Google") {
                try {
                    const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        verificationCode
                    );
                    await firebase.auth().signInWithCredential(credential);

                    firebase.auth().signOut();
                    const googleUser = route.params.googleUser;
                    const SellerData = route.params.SellerData;

                    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
                    var unsubscribe = firebase
                        .auth()
                        .onAuthStateChanged((firebaseUser) => {
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
                                    //console.log(response.user.uid)
                                    let sellerData = {
                                        id: response.user.uid,
                                        role: SellerData.role,
                                        name: SellerData.name,
                                        email: SellerData.email,
                                        phone: SellerData.phone,
                                        address: SellerData.address,
                                    };
                                    const data = firebase
                                        .firestore()
                                        .collection("offer_zone_data")
                                        .doc(response.user.uid)
                                        .set(sellerData);
                                    if (data) {
                                        signUp(sellerData.id, sellerData.name);
                                    }
                                })
                                .catch((err) => {
                                    throw err;
                                });
                        });
                } catch (err) {
                    alert(`Error: ${err.message}`);
                    stopLoading();
                }
            } else if (route.params.SignUpViaMethod === "Email") {
                try {
                    const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        verificationCode
                    );
                    await firebase.auth().signInWithCredential(credential);

                    firebase.auth().signOut();

                    const SellerData = route.params.SellerData;
                    await firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            SellerData.email,
                            SellerData.password
                        )
                        .then((response) => {
                            let sellerData = {
                                id: response.user.uid,
                                role: SellerData.role,
                                name: SellerData.name,
                                email: SellerData.email,
                                phone: SellerData.phone,
                                address: SellerData.address,
                            };

                            const data = firebase
                                .firestore()
                                .collection("offer_zone_data")
                                .doc(response.user.uid)
                                .set(JSON.parse(JSON.stringify(sellerData)));
                            if (data) {
                                //console.log("sellerData", sellerData)
                                signUp(sellerData.id, sellerData.name);
                            }
                        })
                        .catch((err) => {
                            stopLoading();
                            alert(err);
                        });
                } catch (err) {
                    alert(`Error: ${err.message}`);
                    stopLoading();
                }
            }
        } else if (route.params.method === "Login") {
            try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                );
                await firebase.auth().signInWithCredential(credential);
                //console.log(userData.user.uid)
                getSellerDataViaPhone(route.params.SellerData.phone);
                //alert("Login successful 👍");
                stopLoading();
            } catch (err) {
                alert(`Error: ${err.message}`);
                stopLoading();
            }
        }
    };

    const getSellerDataViaPhone = (phone) => {
        //console.log(phone)
        axios
            .get(`${axiosURL}/seller/getSellerDataViaPhone/${phone}`)
            .then((response) => {
                //console.log(response.data)
                if (response.data.status === 200) {
                    signIn(
                        response.data.response.id,
                        response.data.response.name
                    );
                } else {
                    firebase.auth().signOut();
                    alert(response.data.error.errorMessage);
                    stopLoading();
                }
            });
    };

    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

    return (
        <verificationContext.Provider value={authContext}>
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
                        <Text style={styles.headerText}>Verification Code</Text>
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FirebaseRecaptchaVerifierModal
                            ref={recaptchaVerifier}
                            firebaseConfig={firebaseConfig}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.footerText}>
                                Please enter the verification code sent to{" "}
                                <Text style={{ color: "red" }}>
                                    {route.params.SellerData.phone}
                                </Text>
                            </Text>
                        </View>

                        {AutoOTPEnter ? (
                            <SellerOTPInputBox data={"otp"} />
                        ) : (
                            <SellerOTPInputBox data={[]} />
                        )}
                        <View>
                            <TouchableOpacity
                                onPress={() => onVerifyOTPPress()}
                            >
                                <LinearGradient
                                    colors={["#005B0F", "#007F15", "#00A51B"]}
                                    style={[styles.Button]}
                                >
                                    <Text style={styles.textSign}>
                                        Verify OTP
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text>Don't recive the OTP ?</Text>
                                {resendButtonDisabledTime > 0 ? (
                                    <TimerText
                                        text={" RESEND OTP in"}
                                        timer={resendButtonDisabledTime}
                                    />
                                ) : (
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                onResendOtpButtonPress();
                                            }}
                                            style={{
                                                marginTop: 0,
                                                marginLeft: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "orange",
                                                    textDecorationLine:
                                                        "underline",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                RESEND OTP
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity style={{ width: "100%" }}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        textDecorationLine: "underline",
                                        color: "red",
                                        marginTop: 5,
                                    }}
                                >
                                    Change Phone Number
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </verificationContext.Provider>
    );
};
export default SellerOTPVerification;
