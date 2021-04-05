import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/RoleSelectionStyles";

const RoleSelection = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="fadeInUpBig"
                    duraton="1500"
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />
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
                <Text style={styles.headerText}>Welcome!</Text>
                <Text style={[styles.headerText, { fontSize: 22 }]}>
                    Select Your Role To Continue.
                </Text>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CustomerLogin")}
                    >
                        <LinearGradient
                            colors={["#0086FF", "#006EFF", "#3300FF"]}
                            style={[styles.roleButtonBG]}
                        >
                            <Text style={styles.roleButtonText}>
                                <FontAwesome
                                    name="user"
                                    color="#fff"
                                    size={20}
                                />
                                Customer
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SellerLogin")}
                    >
                        <LinearGradient
                            colors={["#EB5050", "#EF1E1E", "#C60000"]}
                            style={[styles.roleButtonBG]}
                        >
                            <Text style={styles.roleButtonText}>
                                <FontAwesome
                                    name="users"
                                    color="#fff"
                                    size={20}
                                />
                                Seller
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default RoleSelection;
