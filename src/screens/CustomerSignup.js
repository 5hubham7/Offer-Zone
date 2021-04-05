import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/CustomerSignupStyles";
import CustomerSignupEmail from "../components/CustomerSignupEmail";

const CustomerSignup = ({ navigation }) => {
    const [SignUp, setSignUp] = useState({
        isEmail: false,
    });

    const handelSignUpEmail = () => {
        setSignUp({ ...SignUp, isEmail: true });
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
                    <Text style={styles.headerText}>Customer Signup</Text>
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
                            <TouchableOpacity>
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
                                onPress={() =>
                                    navigation.navigate("CustomerLogin")
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
                    <CustomerSignupEmail data={navigation} />
                )}
            </Animatable.View>
        </View>
    );
};

export default CustomerSignup;
