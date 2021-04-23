import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/RoleSelectionStyles";

const SelectRole = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <LinearGradient
                style={styles.header}
                colors={["#2E2E2E", "#000000"]}
            >
                <View>
                    <Animatable.Image
                        animation="fadeInUpBig"
                        duraton="1500"
                        source={require("../../assets/logo.png")}
                        style={styles.logo}
                        resizeMode="stretch"
                    />
                </View>
            </LinearGradient>
            <Animatable.View
                animation="fadeInUpBig"
                duration={1500}
                style={[styles.footer]}
            >
                <ImageBackground
                    source={require("../../assets/backgrounds/shopping1.jpg")}
                    style={styles.BGImage}
                    imageStyle={{ borderTopLeftRadius: 60 }}
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.70)"]}
                        style={styles.ImageShadow}
                    >
                        <Text style={[styles.headerText, { marginTop: "1%" }]}>
                            Welcome!
                        </Text>
                        <Text style={[styles.headerText, { fontSize: 22 }]}>
                            Select Your Role To Continue.
                        </Text>
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Login", {
                                        role: "Customer",
                                    })
                                }
                                activeOpacity={0.6}
                            >
                                <LinearGradient
                                    colors={["#02B49E", "#00975F"]}
                                    style={[styles.customerButtonBG]}
                                >
                                    <Text style={styles.customerButtonText}>
                                        <FontAwesome
                                            name="user"
                                            color="#fff"
                                            size={20}
                                        />
                                        {"  "}
                                        Customer
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Login", {
                                        role: "Seller",
                                    })
                                }
                                activeOpacity={0.6}
                            >
                                <LinearGradient
                                    colors={["#007A89", "#888DF5"]}
                                    style={[styles.customerButtonBG]}
                                >
                                    <Text style={styles.customerButtonText}>
                                        <FontAwesome
                                            name="users"
                                            color="#fff"
                                            size={20}
                                        />
                                        {"  "}
                                        Seller
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </Animatable.View>
        </View>
    );
};

export default SelectRole;
