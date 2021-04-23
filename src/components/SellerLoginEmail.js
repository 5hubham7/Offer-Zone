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
import axios from "axios";

import { firebase } from "../helper/FirebaseConfig";
import { AuthContext } from "../components/context/Store";
import { SellerLoginContext } from "../components/context/SellerLoginContext";
import SellerForogtPassword from "../components/SellerForgotPassword";
import axiosURL from "../helper/AxiosURL";
import styles from "../styles/SellerLoginStyles";

const SellerLoginWithEmailInput = (navigation) => {
    const [SellerDetails, setSellerDetails] = useState({
        email: "",
        password: "",
    });

    const [Trigger, setTrigger] = useState({
        isValidEmail: false,
        isPasswordError: false,
        showPassword: true,
        isError: false,
        errorMessage: "",
        errorPasswordMessage: "",
        isLoading: false,
        isForogotPassword: false,
    });
    const { startLoading, stopLoading, signIn } = React.useContext(AuthContext);
    const { goBack } = React.useContext(SellerLoginContext);

    const handelEmailChange = (text) => {
        //console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            //alert("Email is Not Correct");
            setTrigger({ ...Trigger, isValidEmail: false });
        } else {
            setTrigger({ ...Trigger, isValidEmail: true });
            setSellerDetails({
                ...SellerDetails,
                email: text,
            });
            //alert("Email is Correct");
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setSellerDetails({
                ...SellerDetails,
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
        //console.log(SellerDetails)
    };

    const handleForgotPassword = () => {
        setTrigger({ ...Trigger, isForogotPassword: true });
    };

    const onContinuePress = async (email, password) => {
        startLoading();
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                getSellerData(response.user.uid);
            })
            .catch((error) => {
                stopLoading();
                alert(error);
            });
    };

    const getSellerData = (uid) => {
        console.log(uid);
        axios
            .get(`${axiosURL}/seller/getSellerData/${uid}`)
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

    return (
        <View>
            {Trigger.isForogotPassword ? (
                <SellerForogtPassword />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Animatable.View animation="bounceIn" duration={1500}>
                        <Text
                            style={[styles.headerTextMini, { color: "#000" }]}
                        >
                            Login With Email & Password
                        </Text>
                        <View style={styles.InputBox}>
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
                                    onChangeText={(val) =>
                                        handelEmailChange(val)
                                    }
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
                        <View style={styles.InputBox}>
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
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    onContinuePress(
                                        SellerDetails.email,
                                        SellerDetails.password
                                    );
                                }}
                            >
                                <LinearGradient
                                    colors={["#00BEF6", "#018CF0", "#0054E9"]}
                                    style={[styles.loginButtonBG]}
                                >
                                    <Text style={styles.loginButtonText}>
                                        <FontAwesome
                                            name="arrow-right"
                                            color="#fff"
                                            size={20}
                                        />
                                        {"   "}Continue
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
                                Login with another method ?
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
                        <TouchableOpacity
                            onPress={() => {
                                handleForgotPassword();
                            }}
                        >
                            <Text
                                style={[
                                    styles.footerText,
                                    {
                                        color: "gray",
                                        marginLeft: 20,
                                        alignItems: "center",
                                        marginTop: 5,
                                    },
                                ]}
                            >
                                Forgot Password ?
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </ScrollView>
            )}
        </View>
    );
};

export default SellerLoginWithEmailInput;
