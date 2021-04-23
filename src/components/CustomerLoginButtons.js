import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import { CustomerLoginContext } from "../components/context/CustomerLoginContext";
import styles from "../styles/CustomerLoginStyles";

const CustomerLoginButtons = (navigation) => {
    const { emailLogin, phoneLogin, signInWithGoogle } = React.useContext(
        CustomerLoginContext
    );

    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => emailLogin()}>
                    <LinearGradient
                        colors={["#00BEF6", "#018CF0", "#0054E9"]}
                        style={[styles.loginButtonBG]}
                    >
                        <Text style={styles.loginButtonText}>
                            <FontAwesome
                                name="envelope-open"
                                color="#fff"
                                size={20}
                            />
                            {"   "}Log In with Email
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => phoneLogin()}>
                    <LinearGradient
                        colors={["#484848", "#2E2E2E", "#1A1A1A"]}
                        style={[styles.loginButtonBG]}
                    >
                        <Text style={styles.loginButtonText}>
                            <FontAwesome name="mobile" color="#fff" size={28} />
                            {"   "}Log In with Phone No.
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signInWithGoogle()}>
                    <LinearGradient
                        colors={["#DE7F00", "#CF2600", "#C50000"]}
                        style={[styles.loginButtonBG]}
                    >
                        <Text style={styles.loginButtonText}>
                            <FontAwesome name="google" color="#fff" size={20} />
                            {"   "}Log In with Google
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View
                style={[
                    styles.signupText,
                    { marginLeft: 20, alignItems: "center", marginTop: 15 },
                ]}
            >
                <Text style={styles.signupTextColor}>
                    Don't have any account ?
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.data.navigate("CustomerSignUp")}
                >
                    <Text
                        style={[
                            styles.signupTextColor,
                            { fontWeight: "bold", width: 100 },
                        ]}
                    >
                        {" "}
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomerLoginButtons;
