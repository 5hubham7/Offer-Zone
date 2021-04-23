import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

import styles from "../styles/SellerSignupStyles";
import { AuthContext } from "../components/context/Store";

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
} catch (err) {}

const SellerDetails = ({ navigation, route }) => {
    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = firebase.apps.length
        ? firebase.app().options
        : undefined;
    // const [message, showMessage] = React.useState(
    //     !firebaseConfig || Platform.OS === "web"
    //         ? {
    //               text:
    //                   "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
    //           }
    //         : undefined
    // );

    const [SellerDetails, setSellerDetails] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        address: "",
    });

    const { startLoading, stopLoading } = React.useContext(AuthContext);

    const [Trigger, setTrigger] = useState({
        isValidPhoneNo: false,
        errorMessage: "",
    });

    const handelFirstNameChange = (val) => {
        setSellerDetails({ ...SellerDetails, firstName: val });
    };

    const handelLastNameChange = (val) => {
        setSellerDetails({ ...SellerDetails, lastName: val });
    };

    const handelPhoneNoChange = (val) => {
        if (val.trim().length == 10) {
            setSellerDetails({ ...SellerDetails, phoneNo: val });
            setTrigger({
                ...Trigger,
                isValidPhoneNo: false,
                errorMessage: "",
            });
        } else {
            setSellerDetails({ ...SellerDetails, phoneNo: "" });
            setTrigger({
                ...Trigger,
                isValidPhoneNo: true,
                errorMessage: "Enter 10 digit phone number",
            });
        }
    };
    const handelAddressChange = (val) => {
        setSellerDetails({ ...SellerDetails, address: val });
    };

    const onContinuePress = async () => {
        startLoading();

        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                `+91${SellerDetails.phoneNo}`,
                recaptchaVerifier.current
            );

            const Id = verificationId;

            const method = "Signup";

            const SignUpViaMethod = route.params.SignUpViaMethod;

            if (route.params.userCredential) {
                const SellerData = {
                    email: route.params.userCredential.email,
                    password: route.params.userCredential.password,
                    role: "Seller",
                    name:
                        SellerDetails.firstName + " " + SellerDetails.lastName,
                    phone: `+91${SellerDetails.phoneNo}`,
                    address: SellerDetails.address,
                };
                console.log(SellerData);
                stopLoading();
                alert("Verification code has been sent to your phone.");
                navigation.navigate("SellerOTPVerification", {
                    SellerData,
                    Id,
                    method,
                    SignUpViaMethod,
                });
            } else if (route.params.result) {
                const SellerData = {
                    email: route.params.result.user.email,
                    role: "Seller",
                    name:
                        SellerDetails.firstName + " " + SellerDetails.lastName,
                    phone: `+91${SellerDetails.phoneNo}`,
                    address: SellerDetails.address,
                };
                const googleUser = route.params.result;
                stopLoading();
                console.log(SellerData);
                alert("Verification code has been sent to your phone.");
                navigation.navigate("SellerOTPVerification", {
                    SellerData,
                    Id,
                    method,
                    SignUpViaMethod,
                    googleUser,
                });
            }
        } catch (err) {
            stopLoading();
            alert(`Error: ${err.message}`);
        }
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
                <Animatable.View animation="fadeInLeftBig" duration={1500}>
                    <Text style={styles.headerText}>Seller Details</Text>
                </Animatable.View>
            </View>
            <Animatable.View
                animation="fadeInLeftBig"
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
                    <View style={styles.InputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handelFirstNameChange(val)
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.InputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handelLastNameChange(val)
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.InputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) => handelPhoneNoChange(val)}
                            />
                        </View>
                        {Trigger.isValidPhoneNo ? (
                            <Text style={styles.errorMsg}>
                                {Trigger.errorMessage}
                            </Text>
                        ) : null}
                    </View>
                    <View style={styles.InputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Address"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) => handelAddressChange(val)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onContinuePress();
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
                                {"   "}Continue
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SellerDetails;
