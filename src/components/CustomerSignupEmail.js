import React from "react";
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
import styles from "../styles/CustomerSignupStyles";
import Feather from "react-native-vector-icons/Feather";

const CustomerSignupEmail = (navigation) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View animation="bounceIn" duration={1500}>
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
                        />
                        <TouchableOpacity>
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                                style={{ marginRight: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.InputBox}>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#666666"
                            style={[
                                styles.textInput,
                                {
                                    color: "#000",
                                },
                            ]}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity>
                            <FontAwesome
                                name="eye"
                                color="grey"
                                size={20}
                                style={{ marginRight: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.InputBox}>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="#666666"
                            style={[
                                styles.textInput,
                                {
                                    color: "#000",
                                },
                            ]}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity>
                            <FontAwesome
                                name="eye"
                                color="grey"
                                size={20}
                                style={{ marginRight: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
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
                                Continue
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
                                Sign Up with Google
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.textPrivate,
                        { marginLeft: 20, alignItems: "center" },
                    ]}
                >
                    <Text style={styles.loginText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.data.navigate("CustomerLogin")
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
            </Animatable.View>
        </ScrollView>
    );
};

export default CustomerSignupEmail;
