import React, { useEffect, useState } from "react";
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
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import axios from "axios";

import { AuthContext } from "../components/context/Store";
import { SellerLoginContext } from "../components/context/SellerLoginContext";
import axiosURL from "../helper/AxiosURL";
import styles from "../styles/SellerLoginStyles";

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

const SellerLoginPhone = (navigation) => {
    const [SellerDetails, setSellerDetails] = useState({
        phoneNo: "",
    });

    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = firebase.apps.length
        ? firebase.app().options
        : undefined;

    const [Trigger, setTrigger] = useState({
        isValidPhoneNo: false,
    });

    const { startLoading, stopLoading } = React.useContext(AuthContext);

    const { goBack } = React.useContext(SellerLoginContext);

    const handelPhoneChange = (text) => {
        if (text.length > 10 || text.length < 10) {
            setTrigger({ ...Trigger, isValidPhoneNo: false });
        } else {
            setTrigger({ ...Trigger, isValidPhoneNo: true });
            setSellerDetails({
                ...SellerDetails,
                phoneNo: text,
            });
        }
    };

    const sendOTP = async () => {
        if (SellerDetails.phoneNo.length !== 10) {
            stopLoading();
            alert("Enter Valid Phone Number");
        } else {
            try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                    `+91${SellerDetails.phoneNo}`,
                    recaptchaVerifier.current
                );
                const SellerData = {
                    phone: `+91${SellerDetails.phoneNo}`,
                };

                const method = "Login";
                const Id = verificationId;
                stopLoading();
                alert("Verification code has been sent to your phone.");
                navigation.data.navigate("SellerOTPVerification", {
                    SellerData,
                    Id,
                    method,
                });
            } catch (err) {
                stopLoading();
                alert(`Error: ${err.message}`);
            }
        }
    };
    const onSendOTPPress = () => {
        startLoading();
        try {
            axios
                .get(
                    `${axiosURL}/customer/getSellerDataViaPhone/+91${SellerDetails.phoneNo}`
                )
                .then((response) => {
                    if (
                        response.data.status === 405 &&
                        response.data.error.errorMessage ===
                            "No matching documents."
                    ) {
                        alert("Phone Number Doesn't Exist.");
                        stopLoading();
                    } else if (response.data.status === 200) {
                        sendOTP();
                    }
                });
        } catch (error) {
            alert("Server Error Please Try Again.");
        }
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animatable.View animation="bounceIn" duration={1500}>
                    <Text style={[styles.headerTextMini, { color: "#000" }]}>
                        Login With Phone Number
                    </Text>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    />
                    <View style={styles.InputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor="#666666"
                                keyboardType="numeric"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) => handelPhoneChange(val)}
                            />
                            <TouchableOpacity>
                                {Trigger.isValidPhoneNo ? (
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
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                onSendOTPPress();
                            }}
                        >
                            <LinearGradient
                                colors={["#00BEF6", "#018CF0", "#0054E9"]}
                                style={[styles.loginButtonBG]}
                            >
                                <Text style={styles.loginButtonText}>
                                    <FontAwesome
                                        name="paper-plane"
                                        color="#fff"
                                        size={20}
                                    />
                                    {"   "}Send OTP
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.signupText,
                            {
                                marginLeft: 20,
                                alignItems: "center",
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text style={styles.signupTextColor}>
                            Login with another method?
                        </Text>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Text
                                style={[
                                    styles.footerText,
                                    { fontWeight: "bold", width: 100 },
                                ]}
                            >
                                {" "}
                                Go Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ScrollView>
        </View>
    );
};

export default SellerLoginPhone;
