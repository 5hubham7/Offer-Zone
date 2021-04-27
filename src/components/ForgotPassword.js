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

import { firebase } from "../helper/FirebaseConfig";
import { AuthContext } from "./context/Store";
import { LoginContext } from "./context/LoginContext";
import styles from "../styles/SignupStyles";

const ForgotPassword = (navigation) => {
    const [userDetails, setUserDetails] = useState({
        email: "",
    });
    const [Trigger, setTrigger] = useState({
        isValidEmail: false,
    });
    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const { goBack } = React.useContext(LoginContext);

    const handelEmailChange = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setTrigger({ ...Trigger, isValidEmail: false });
        } else {
            setTrigger({ ...Trigger, isValidEmail: true });
            setUserDetails({
                ...userDetails,
                email: text,
            });
        }
    };

    const handlePasswordReset = async () => {
        startLoading();
        try {
            await firebase.auth().sendPasswordResetEmail(userDetails.email);
            stopLoading();
            alert("Password reset email sent successfully!");
            goBack();
        } catch (error) {
            stopLoading();
            alert(error);
        }
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animatable.View animation="bounceIn" duration={1500}>
                    <Text style={[styles.headerTextMini, { color: "#000" }]}>
                        Forgot Password
                    </Text>
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
                            <TouchableOpacity>
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
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                handlePasswordReset();
                            }}
                        >
                            <LinearGradient
                                colors={["#00BEF6", "#018CF0", "#0054E9"]}
                                style={[styles.signupButtonBG]}
                            >
                                <Text style={styles.signupButtonText}>
                                    <FontAwesome
                                        name="paper-plane"
                                        color="#fff"
                                        size={20}
                                    />
                                    {"  "}
                                    Send Email
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.loginText,
                            {
                                marginLeft: 20,
                                alignItems: "center",
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text style={styles.loginTextColor}>
                            Login with another method?
                        </Text>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Text
                                style={[
                                    styles.loginTextColor,
                                    { fontWeight: "bold", width: 100 },
                                ]}
                            >
                                {"  "}
                                Go Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ScrollView>
        </View>
    );
};

export default ForgotPassword;
