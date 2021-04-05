import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomerLoginButtons from "../components/CustomerLoginButtons";
import styles from "../styles/CustomerLoginStyles";

const CustomerLogin = ({ navigation }) => {
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
                    <Text style={styles.headerText}>Customer Login</Text>
                    <Text style={[styles.headerTextMini, { fontSize: 24 }]}>
                        Welcome Back!
                    </Text>
                </Animatable.View>
            </View>
            <Animatable.View
                animation="fadeInRightBig"
                duration={1500}
                style={[
                    styles.footer,
                    {
                        backgroundColor: "#fff",
                    },
                ]}
            >
                <CustomerLoginButtons data={navigation} />
            </Animatable.View>
        </View>
    );
};

export default CustomerLogin;
