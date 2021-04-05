import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const SellerLoginButtons = (navigation) => {
    return (
        <View>
            <View>
                <TouchableOpacity>
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
                            {"  "}
                            Log In with Email
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LinearGradient
                        colors={["#484848", "#2E2E2E", "#1A1A1A"]}
                        style={[styles.loginButtonBG]}
                    >
                        <Text style={styles.loginButtonText}>
                            <FontAwesome name="mobile" color="#fff" size={28} />
                            {"  "}
                            Log In with Phone No.
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LinearGradient
                        colors={["#DE7F00", "#CF2600", "#C50000"]}
                        style={[styles.loginButtonBG]}
                    >
                        <Text style={styles.loginButtonText}>
                            <FontAwesome name="google" color="#fff" size={20} />
                            {"  "}
                            Log In with Google
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View
                style={[
                    styles.signupText,
                    { marginLeft: 20, alignItems: "center" },
                ]}
            >
                <Text style={styles.signupTextColor}>
                    Don't have any account?
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.data.navigate("SellerSignup")}
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
                <Text
                    style={[
                        styles.footerText,
                        { marginTop: 15, color: "gray" },
                    ]}
                >
                    Forgot Password?
                </Text>
            </View>
        </View>
    );
};

export default SellerLoginButtons;

const { width } = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 0,
    },
    footerText: {
        color: "#05375a",
        fontSize: 18,
    },
    loginButtonBG: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        backgroundColor: "#000",
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        width: "100%",
    },
    signupText: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        width: width,
    },
    signupTextColor: {
        color: "#000",
        fontSize: 18,
    },
});
